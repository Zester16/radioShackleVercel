
//function hello(stationName){console.log(`Hellow Moto from ${stationName}`)}
////the main function which will fetch AudioLiveData
async function getDatafromStream(stationName,streamUrl){
    let rep= await req(streamUrl)
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
        parsedData.showName=nowPlaying.shows.current.title
        parsedData.host=nowPlaying.shows.current.moderator.name
      }
      else if(stationName==='radio_rundfunk_914'){
        let nowPlaying=rep[1]
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
