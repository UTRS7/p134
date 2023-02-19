objects = [];
status = "";
video = "";
song = "";

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload()
{
    video = createCapture(VIDEO);
    video.hide();
    song = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw()
{
    image(video, 0 , 0 , 480 , 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected : " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);i
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i] != "person") {
                song.rate(1);

            } else {
                song.rate(0);

            }
        }

    }
}



function modelLoaded()
{
    console.log("ModelLoaded");
    status = true;
    video.loop();
    video.speed(1.1);
    video.volume(0.5)
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;

}