/**
 * Created with JetBrains PhpStorm.
 * User: ademilter
 * Date: 8/16/13
 * Time: 10:31 PM
 * To change this template use File | Settings | File Templates.
 */

var vStatu = true;

$(function () {
    var vW = 640, vH = 360, vW2 = 800, vH2 = 450,
        videoID = "A3PDXmYoF5U",
        params = { allowScriptAccess: "always" },
        atts = { id: "ytPlayer" },
        atts2 = { id: "ytPlayer2" };

    swfobject.embedSWF("http://www.youtube.com/v/" + videoID +
        "?showinfo=0&version=3&enablejsapi=1&playerapiid=player1",
        "videoDiv", vW, vH, "9", null, null, params, atts);
    swfobject.embedSWF("http://www.youtube.com/v/" + videoID +
        "?showinfo=0&version=3&enablejsapi=1&playerapiid=player2",
        "videoDiv2", vW2, vH2, "9", null, null, params, atts2);


    $(".url-button").on("click", function () {
        var url = youtube_parser($(".url-text").val());

        ytplayer.loadVideoById(url);
        ytplayer2.loadVideoById(url);
        vStatu = false;
        ytplayer2.playVideo();

    });
});

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        return match[7];
    } else {
        alert("Url incorrecta");
    }
}


function onYouTubePlayerReady(playerId) {
    if (playerId == "player1") {
        ytplayer = document.getElementById("ytPlayer");
        ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
    }
    else if (playerId == "player2") {
        ytplayer2 = document.getElementById("ytPlayer2");
        ytplayer2.setPlaybackQuality("small");
        ytplayer2.mute();
        ytplayer2.addEventListener("onStateChange", "onPlayerStateChange2");
    }
}

function onPlayerStateChange(newState) {
    switch (newState) {

        //ended
        case 0:

            break;

        //playing
        case 1:

            if (vStatu) {
                vStatu = false;
                ytplayer.pauseVideo();
                ytplayer2.playVideo();
            }
            else {
                ytplayer2.playVideo();
                ytplayer2.seekTo(parseFloat(ytplayer.getCurrentTime()), false);
            }
            break;

        //paused
        case 2:

            ytplayer2.pauseVideo();
            ytplayer2.seekTo(parseFloat(ytplayer.getCurrentTime()), false);
            break;

        //buffering
        case 3:
            ytplayer.pauseVideo();
            ytplayer2.playVideo();
            break;

        //video cued
        case 5:
            break;
    }
}

function onPlayerStateChange2(newState) {
    switch (newState) {
        case 0:
            break;
        case 1:
            ytplayer.playVideo();
            break;
        case 2:
            break;
        case 3:
            ytplayer.playVideo();
            break;
        case 5:
            break;
    }
}