// Based on LawinServer's CloudStorage Encoding 
// (https://github.com/Lawin0129/LawinServer/blob/main/structure/cloudstorage.js)

function rawBody(req, res, next) {
  if (req.headers["content-length"]) {
    if (Number(req.headers["content-length"]) >= 400000)
      return res
        .status(403)
        .json({ error: "Files over 4kb cant be uploaded to the backend." });
  }

  try {
    req.rawBody = "";
    req.setEncoding("latin1");

    req.on("data", (chunk) => (req.rawBody += chunk));
    req.on("end", () => next());
  } catch {
    res.status(400).json({
      error: "ERROR",
    });
  }
}

module.exports = { rawBody };
