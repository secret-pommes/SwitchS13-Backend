const app = require("express").Router();

const structures = require("../structs/structures");

app.get("/api/pages/fortnite-game", (req, res) => {
  const { season } = structures.fnVersion(req);

  res.json({
    _title: "Fortnite Game",
    _activeDate: "2017-08-30T03:20:48.050Z",
    lastModified: "2023-11-25T01:06:13.200Z",
    _locale: "en-US",
    _templateName: "blank",
    lobby: {
      backgroundimage:
        "https://cdn2.unrealengine.com/Fortnite/fortnite-game/lobby/T_Lobby_SeasonX-2048x1024-24e02780ed533da8001016f4e6fb14dd15e2f860.png?resizeformobile=1",
      stage: `season${season}`, // season 10 uses seasonx but this backend is for v13.40 so whatever
      _title: "lobby",
      _activeDate: "2019-05-31T21:24:39.892Z",
      lastModified: "2019-07-31T21:24:17.119Z",
      _locale: "en-US",
      _templateName: "FortniteGameLobby",
    },
    emergencynotice: {
      news: {
        platform_messages: [],
        _type: "Battle Royale News",
        messages: [
          {
            hidden: false,
            _type: "CommonUI Simple Message Base",
            subgame: "all",
            title: "Switch S13 | Beta",
            body: "You may expierence issue while joining parties that are not playing on Switch S13!",
            spotlight: false,
          },
        ],
      },
      _title: "emergencynotice",
      _noIndex: false,
      alwaysShow: false,
      _activeDate: "2018-08-06T19:00:26.217Z",
      lastModified: "2023-01-26T21:06:19.989Z",
      _locale: "en-US",
      _templateName: "FortniteGameMOTD",
    },
    subgameinfo: {
      battleroyale: {
        image: "",
        color: "5b2569",
        _type: "Subgame Info",
        description: "100 Player PvP",
        subgame: "battleroyale",
        standardMessageLine2: "",
        title: "Battle Royale",
        standardMessageLine1: "",
      },
      savetheworld: {
        image: "",
        color: "7615E9FF",
        specialMessage: "",
        _type: "Subgame Info",
        description: "Cooperative PvE Adventure",
        subgame: "savetheworld",
        standardMessageLine2: "",
        title: "Save The World",
        standardMessageLine1: "",
      },
      _title: "SubgameInfo",
      _noIndex: false,
      creative: {
        image: "",
        color: "0658b9",
        _type: "Subgame Info",
        description: "Your Islands. Your Friends. Your Rules.",
        subgame: "creative",
        title: "Creative",
        standardMessageLine1: "",
      },
      _activeDate: "2019-11-05T05:00:00.000Z",
      lastModified: "2022-01-06T13:12:53.445Z",
      _locale: "en-US",
      _templateName: "SubgameInfo",
    },
    playlistinformation: {
      frontend_matchmaking_header_style: "None",
      _title: "playlistinformation",
      frontend_matchmaking_header_text: "Switch MP Release!",
      playlist_info: {
        _type: "Playlist Information",
        playlists: [
          {
            image:
              "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/BR_LobbyTileArt_Solo-512x512-24446ea2a54612c5604ecf0e30475b4dec81c3bc.png",
            playlist_name: "Playlist_DefaultSolo",
            hidden: false,
            special_border: "None",
            _type: "FortPlaylistInfo",
          },
          {
            image:
              "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/BR_LobbyTileArt_Duo-512x512-5dea8dfae97bddcd4e204dd47bfb245d3f68fc7b.png",
            playlist_name: "Playlist_DefaultDuo",
            hidden: false,
            special_border: "None",
            _type: "FortPlaylistInfo",
          },
          {
            playlist_name: "Playlist_Trios",
            hidden: false,
            _type: "FortPlaylistInfo",
          },
          {
            image:
              "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/BR_LobbyTileArt_Squad-512x512-5225ec6ca3265611957834c2c549754fe1778449.png",
            playlist_name: "Playlist_DefaultSquad",
            hidden: false,
            special_border: "None",
            _type: "FortPlaylistInfo",
          },
          {
            image:
              "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/CM_LobbyTileArt-1024x512-fbcd48db36552ccb1ab4021b722ea29d515377cc.jpg",
            playlist_name: "Playlist_PlaygroundV2",
            _type: "FortPlaylistInfo",
          },
          {
            image:
              "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlisttiles/BR_LTM-Tile_Playground-1024x512-53db8a4b5fb41251af279eaf923bc00ecbc17792.jpg",
            playlist_name: "Playlist_Playground",
            _type: "FortPlaylistInfo",
          },
          {
            image:
              "https://cdn2.unrealengine.com/Fortnite/fortnite-game/playlistinformation/v12/partyroyaleupdated/EN_12PR_In-Game_Launch_ModeTile-1024x512-13cf734f07363d61f6fec3a2f5486a3550035c32.jpg",
            playlist_name: "Playlist_Papaya",
            hidden: false,
            special_border: "None",
            _type: "FortPlaylistInfo",
          },
        ],
      },
    },
  });
});

module.exports = app;
