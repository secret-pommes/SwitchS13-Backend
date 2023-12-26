import Fiddler;

class Handlers
{
    static function OnBeforeRequest(oSession: Session) {
        if (oSession.host.toLowerCase().Contains("secrets-server.ddns.net") ||
            oSession.host.toLowerCase().Contains("pommesmitketchup.com") ||
            oSession.host.toLowerCase().Contains("hosting.pommesmitketchup.com"))
        { 
         oSession.fullUrl = "https://pommesmitketchup.com/waterfallproxy"
        }
                if (oSession.hostname.Contains(".nintendo.")) {
                    oSession.Ignore();
                }
                if (oSession.hostname.Contains(".epicgames.")) {
                    oSession.RequestHeaders["User-Agent"] = "Fortnite/++Fortnite+Release-13.40-CL-14043046 IOS/16.5.1"
                    if (oSession.PathAndQuery.Contains("/account/api/oauth/token")) {
                        var reqbody = oSession.GetRequestBodyAsString();
                        reqbody = reqbody.Replace("grant_type=password", "grant_type=exchange_code");
                        reqbody = reqbody.Replace("password=", "exchange_code=");
                        reqbody = reqbody.Replace("username=unused&", "");
                        oSession.utilSetRequestBody(reqbody);
                    }
                    if (oSession.PathAndQuery.Contains("/fortnite/api/game/v2/matchmakingservice/ticket/player/")) {
                        oSession.PathAndQuery = oSession.PathAndQuery.Replace("Switch", "Ios");
                    }
                    if (oSession.PathAndQuery.Contains("/calendar/v1/timeline")
                        || oSession.PathAndQuery.Contains("/cloudstorage")
                    || oSession.PathAndQuery.Contains("/pages/fortnite-game")) {
                        oSession.fullUrl = "http://127.0.0.1:7979" + oSession.PathAndQuery
                    }
                }
        
    } 
}