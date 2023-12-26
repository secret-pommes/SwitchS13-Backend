function fnVersion(req) {
  let buildInfo = {
    version: 1.8,
    season: 1,
  };
 
  try { // this will only work on V3.0+ (but this is a v13.40 so whatever)
    buildInfo.version = req.headers["user-agent"].split("-")[1].split("-")[0];
    buildInfo.season = req.headers["user-agent"].split("-")[1].split(".")[0];
  } catch {}

  return buildInfo;
}

module.exports = { fnVersion };
