song1 = "";
song2 = "";
scorelw = 0;
scorerw = 0;
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
song_status1 = "";
song_status2 = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(350, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
  lwx = results[0].pose.leftWrist.x;
  lwy = results[0].pose.leftWrist.y;
  rwx = results[0].pose.rightWrist.x;
  rwy = results[0].pose.rightWrist.y;
  }
}

function draw()
{
    image(video, 0, 0, 350, 350);
    fill("red");
    stroke("red");
    song_status1 = song1.isPlaying();
    song_status2 = song2.isPlaying();
    if(scorerw>0.2)
    {
        circle(rwx, rwy, 20);
        song2.stop();
        if(song_status1 == false)
        {
            song1.play();
            document.getElementById('song_name').innerHTML = "Playing Harry Potter Song";
        }
    }
    if(scorelw>0.2)
    {
        circle(lwx, lwy, 20);
        song1.stop();
        if(song_status2 == false)
        {
            song2.play();
            document.getElementById('song_name').innerHTML = "Playing Peter Pan Song";
        }
    }
}

function playSong()
{
    song1.play();
    song2.play();
    song.setVolume(1);
    song.rate(1);
}