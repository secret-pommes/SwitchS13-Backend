const app = require("express").Router();
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const error = require("../structs/error.js");
const structures = require("../structs/structures.js");
const { rawBody } = require("../structs/encode.js");

Date.prototype.addHours = function (hours) {
  this.setTime(this.getTime() + hours * 60 * 60 * 1000);
  return this;
};

// Hotfixes (re-activate full frontend)
app.get("/api/cloudstorage/system", (req, res) => {
  const base = path.join(__dirname, "../CloudStorage");

  let files = [];

  fs.readdirSync(base).forEach((file) => {
    if (file.toLowerCase().endsWith(".ini")) {
      const ParsedFile = fs.readFileSync(path.join(base, file)).toString();
      const ParsedStats = fs.statSync(path.join(base, file));
      const hash = crypto.createHash("sha1").update(ParsedFile).digest("hex");
      const hash256 = crypto
        .createHash("sha256")
        .update(ParsedFile)
        .digest("hex");

      files.push({
        uniqueFilename: file,
        filename: file,
        hash: hash,
        hash256: hash256,
        length: ParsedFile.length,
        contentType: "application/octet-stream",
        uploaded: ParsedStats.mtime,
        storageType: "S3",
        storageIds: {},
        doNotCache: true,
      });
    }
  });

  res.json(files);
});

app.get("/api/cloudstorage/system/config", (req, res) => {
  res.json({
    lastUpdated: new Date().toISOString(),
    disableV2: false,
    isAuthenticated: true,
    enumerateFilesPath: "/api/cloudstorage/system",
    enableMigration: false,
    enableWrites: false,
    epicAppName: "Live",
    transports: {
      McpProxyTransport: {
        name: "McpProxyTransport",
        type: "ProxyStreamingFile",
        appName: "fortnite",
        isEnabled: false,
        isRequired: true,
        isPrimary: true,
        timeoutSeconds: 30,
        priority: 10,
      },
      McpSignatoryTransport: {
        name: "McpSignatoryTransport",
        type: "ProxySignatory",
        appName: "fortnite",
        isEnabled: false,
        isRequired: false,
        isPrimary: false,
        timeoutSeconds: 30,
        priority: 20,
      },
      DssDirectTransport: {
        name: "DssDirectTransport",
        type: "DirectDss",
        appName: "fortnite",
        isEnabled: true,
        isRequired: false,
        isPrimary: false,
        timeoutSeconds: 30,
        priority: 30,
      },
    },
  });
});

app.get("/api/cloudstorage/system/:file", (req, res) => {
  const file = path.join(__dirname, `../CloudStorage/${req.params.file}`);

  if (fs.existsSync(file)) {
    res.sendFile(file);
  } else {
    return res
      .set(error.not_found(req, "fortnite").header)
      .status(404)
      .json(error.not_found(req, "fortnite").error);
  }
});

app.get("/api/cloudstorage/storage/:accountId/info", async (req, res) => {
  res.json({
    accountId: req.params.accountId,
    totalStorage: 9223372036854775807,
    totalUsed: 0,
  });
});

app.get("/api/cloudstorage/user/config", (req, res) => {
  res.json({
    lastUpdated: new Date().toISOString(),
    disableV2: true,
    isAuthenticated: true,
    enumerateFilesPath: "/api/cloudstorage/user",
    enableMigration: false,
    enableWrites: true,
    epicAppName: "Live",
    transports: {
      McpProxyTransport: {
        name: "McpProxyTransport",
        type: "ProxyStreamingFile",
        appName: "fortnite",
        isEnabled: true,
        isRequired: true,
        isPrimary: true,
        timeoutSeconds: 30,
        priority: 10,
      },
      McpSignatoryTransport: {
        name: "McpSignatoryTransport",
        type: "ProxySignatory",
        appName: "fortnite",
        isEnabled: false,
        isRequired: false,
        isPrimary: false,
        timeoutSeconds: 30,
        priority: 20,
      },
      DssDirectTransport: {
        name: "DssDirectTransport",
        type: "DirectDss",
        appName: "fortnite",
        isEnabled: false,
        isRequired: false,
        isPrimary: false,
        timeoutSeconds: 30,
        priority: 30,
      },
    },
  });
});

app.get("/api/cloudstorage/user/:accountId", async (req, res) => {
  res.set("Content-Type", "application/json");

  const saveDir = path.join(
    __dirname,
    `../ClientSettings/${req.params.accountId}/ClientSettings.Sav`
  );

  if (fs.existsSync(saveDir)) {
    res.json([
      {
        uniqueFilename: "ClientSettingsSwitch.Sav",
        filename: "ClientSettingsSwitch.Sav",
        hash: crypto
          .createHash("sha1")
          .update(fs.readFileSync(saveDir, "latin1"))
          .digest("hex"),
        hash256: crypto
          .createHash("sha256")
          .update(fs.readFileSync(saveDir, "latin1"))
          .digest("hex"),
        length: Buffer.byteLength(fs.readFileSync(saveDir, "latin1")),
        contentType: "text/plain",
        uploaded: fs.statSync(saveDir).mtime,
        storageType: "S3",
        storageIds: {},
        metadata: {},
        accountId: req.params.accountId,
      },
    ]);
  } else {
    res.status(204).end();
  }
});

app.get("/api/cloudstorage/user/:accountId/*", (req, res) => {
  res.set("Content-Type", "application/octet-stream");

  const saveDir = path.join(
    __dirname,
    `../ClientSettings/${req.params.accountId}/ClientSettings.Sav`
  );

  if (fs.existsSync(saveDir)) {
    // is this really the issue??
    res.status(200).send(fs.readFileSync(saveDir)).end();
  } else {
    res.status(204).end();
  }
});

app.all("/api/cloudstorage/user/:accountId/:file", rawBody, (req, res) => {
  if (req.method != "PUT") {
    return res
      .set(error.method(req, "fortnite").header)
      .status(405)
      .json(error.method(req, "fortnite").error);
  }

  const saveDir = path.join(
    __dirname,
    `../ClientSettings/${req.params.accountId}`
  );

  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir);
  }

  const save = path.join(saveDir, `ClientSettings.Sav`);
  fs.writeFileSync(save, req.rawBody, "latin1");

  res.status(204).end();
});

app.get("/api/calendar/v1/timeline", (req, res) => {
  const { season } = structures.fnVersion(req);

  res.json({
    channels: {
      "client-matchmaking": {
        states: [],
        cacheExpire: new Date().addHours(1337),
      },
      "client-events": {
        states: [
          {
            validFrom: "2020-01-01T20:28:47.830Z",
            activeEvents: [
              {
                eventType: `EventFlag.Season${season}`,
                activeUntil: "9999-01-01T00:00:00.000Z",
                activeSince: "2020-01-01T00:00:00.000Z",
              },
              {
                eventType: `EventFlag.LobbySeason${season}`,
                activeUntil: "9999-01-01T00:00:00.000Z",
                activeSince: "2020-01-01T00:00:00.000Z",
              },
            ],
            state: {
              activeStorefronts: [],
              eventNamedWeights: {},
              seasonNumber: season,
              seasonTemplateId: `AthenaSeason:athenaseason${season}`,
              matchXpBonusPoints: 0,
              seasonBegin: "1337-12-01T07:30:00Z",
              seasonEnd: "4444-12-01T07:30:00Z",
              seasonDisplayedEnd: "4444-12-01T07:30:00Z",
              weeklyStoreEnd: new Date().addHours(24),
              stwEventStoreEnd: new Date().addHours(168),
              stwWeeklyStoreEnd: new Date().addHours(168),
              sectionStoreEnds: { Featured: new Date().addHours(24) },
              dailyStoreEnd: new Date().addHours(24),
            },
          },
        ],
        cacheExpire: new Date().addHours(1337),
      },
    },
    eventsTimeOffsetHrs: 0,
    cacheIntervalMins: 10,
    currentTime: new Date().toISOString(),
  });
});

module.exports = app;
