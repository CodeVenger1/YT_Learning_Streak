const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const port = 5000;
const data_file = path.join(__dirname,"yt_data.json");
const daily_goal = 2;

async function loadData() {
    try{
        const file = await fs.readFile(data_file, "utf-8");
        return JSON.parse(file);
    }
    catch (err){
        console.log(err.message);
        return {
            last_date:"",
            today_minutes: 0,
            streak:0,
            updated: false
        };
    }
}

async function saveData(data) {
    await fs.writeFile(data_file, JSON.stringify(data,null,2));
}

// async function resetAtMidnight(){
//     const now = new Date();
//     const nextMidnight = new Date(now);

//     nextMidnight.setHours(24,0,0,0);

//     const msUntilMidnight = nextMidnight - now;

//     setTimeout(async ()=> {
//         const data = await loadData();
        
//         if(data.today_minutes < daily_goal){
//             data.streak = 0;
//         }

//         const today = new Date().toISOString().split("T")[0];
//         data.last_date = today;
//         data.today_minutes = 0;

//         await saveData(data);
//         console.log("Midnight reset done!!");

//         resetAtMidnight();
//     }, msUntilMidnight);
// }

const server = http.createServer(async (req, res) => {
    if(req.method === "POST" && req.url === "/status") {
        let body = "";

        req.on("data" , chunk => body += chunk.toString());
        req.on("end" , async () => {
            try{
                const payload = JSON.parse(body);
                if(payload.isPlaying){
                    const data = await loadData();
                    const today = new Date().toISOString().split("T")[0];

                    if(data.last_date !== today) {
                        if(data.today_minutes < daily_goal){
                            data.streak = 0;
                        }
                        data.today_minutes = 0;
                        data.last_date = today;
                    }

                    else{
                        data.today_minutes += 10/60;
                        if(data.today_minutes >= daily_goal && data.updated === false){
                            data.streak += 1;
                            data.updated = true;
                        }
                    }

                    await saveData(data);

                    console.log(`▶️ Watching video... Time today: ${data.today_minutes.toFixed(2)} min`);
                }

                res.writeHead(200);
                res.end("OK");
            }

            catch(err){
                console.error(err);
                res.writeHead(400);
                res.end("Bad Request");
            }
        });
    }
    else{
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(port , () => {
    console.log(" Tracker running !!");
})