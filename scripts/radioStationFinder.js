
//function hello(stationName){console.log(`Hellow Moto from ${stationName}`)}
////the main function which will fetch AudioLiveData
async function getDatafromStream(stationName,streamUrl,picUrl,streamType){
    let rep =null;
    console.log(streamType)
    if(!streamType)
    {
       rep= await req(streamUrl)
    }
    else {
       rep = await reqRS(stationName)
    }

    //let rep2 = await reqQ102(streamUrl)
    let parsedData={title:null,artist:null,songImgUrl:null,showName:null,host:null,}
    if(rep!==null){
      if(stationName=='radio_klassik' || stationName=="radio_klassik_backup" ){
        let nowPlaying=rep[1]
         parsedData.title=nowPlaying.song_title
         parsedData.artist=nowPlaying.artist_name
         parsedData.songImgUrl=nowPlaying.stream_logo
      }
      else if(stationName==='radio_bern_1'){

        let nowPlaying=rep.data.audioPlayer

        parsedData.title=nowPlaying.stream.live.title
        parsedData.artist=nowPlaying.stream.live.interpret
        parsedData.songImgUrl=nowPlaying.stream.live.image.imageUrl
        parsedData.showName=nowPlaying.shows.current.moderator.name
        parsedData.host=nowPlaying.shows.current.moderator.name
      }
      else if(stationName==='radio_rundfunk_914'){
        let nowPlaying=rep[2]
        parsedData.title=nowPlaying.song_title
        parsedData.artist=nowPlaying.artist_name
        parsedData.songImgUrl=nowPlaying.covers.cover_art_url_xxl


      }
      else if(stationName==="breeze_fm_nz"){
        let nowPlaying=rep.nowPlaying[0]
        parsedData.artist=nowPlaying.artist
        parsedData.title=nowPlaying.name
        parsedData.songImgUrl=nowPlaying.largeArtwork

      }
      else if(stationName === "rmf_maxxx_fm" || stationName === "rmf_fm_pl")
      {
          let nowPlaying = rep.filter(station => station.order === 0)[0];
          parsedData.artist=nowPlaying.author
          parsedData.title=nowPlaying.recordTitle
          parsedData.songImgUrl=nowPlaying.coverUrl
      }
      else if(stationName === "q_fm_102")
      {
        let nowPlaying=rep.feed.items[0]
        parsedData.artist=nowPlaying.title
        parsedData.title=nowPlaying.desc
        parsedData.songImgUrl=nowPlaying.image
        parsedData.showName= rep.live.items[0].title;
      }
      else if(stationName === "vrock_fm_ch")
      {

        let nowPlaying=rep.data.audioPlayer.stream.live
        parsedData.artist=nowPlaying.interpret
        parsedData.title=nowPlaying.title
        parsedData.songImgUrl=nowPlaying.image.imageUrl
        parsedData.showName= rep.data.audioPlayer.shows.current.title;
      }
      else if(stationName === "jazz_fm_rm")
      {
        let nowPlaying=rep
        parsedData.artist = "N/A"
        parsedData.title=nowPlaying.song
        parsedData.songImgUrl=picUrl

      }
      else if(stationName === "lounge_fm_936")
      {
        let nowPlaying=rep
        parsedData.artist = nowPlaying.artist
        parsedData.title=nowPlaying.title
        parsedData.songImgUrl=nowPlaying.coverUrlM

      }
      else if(stationName === "radio_classique")
      {

        let nowPlaying=rep
        parsedData.artist = nowPlaying.auteur
        parsedData.title=nowPlaying.titre
        parsedData.songImgUrl=picUrl

      }
      else if(stationName === "sublime_nl")
      {

        let nowPlaying=rep.nowPlaying
        parsedData.artist = nowPlaying.artist
        parsedData.title=nowPlaying.song
        parsedData.songImgUrl=picUrl

      }
    }

    return parsedData
}
//uses axios to fetch data from internet
async function req(url){
  try{
    let headers={headers:{Accept:'application/json'}}
    let result=await axios.get(url,headers)
    //console.log(result.data)
    return result.data
  }
  catch(error){
    console.log(error)
    return null
  }

}

async function reqRS(stationName){
  try {
    //let url = `https://radioshackle.herokuapp.com/${stationName}`
    //https://radioshackle-data-pull.ey.r.appspot.com/${stationName}
    //
    let url = `https://radioshackle-data-pull-211122.ue.r.appspot.com/${stationName}`
    //let headers={headers:{Accept: 'application/json', 'Access-Control-Allow-Origin': '*'}}
    let result=await axios.get(url)
    //console.log(result.data)
    return result.data

  }
  catch (e)
  {
    console.log("Q102 Error"+e)
  } finally {

  }
}
//checks response and sends across
function routeRequest()
{

}
