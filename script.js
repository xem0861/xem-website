function fetchDataAndRefresh() {
    fetch("https://api.lanyard.rest/v1/users/152390347186503681")
      .then(response => response.json())
      .then(data => {
        const avatarUrl = "https://cdn.discordapp.com/avatars/152390347186503681/" + data.data.discord_user.avatar;
        const status = data.data.discord_status;
        const name = data.data.discord_user.username;
        const activities = data.data.activities; // Array of activities
  
        const pfp2 = document.getElementById("pfp-2");
        pfp2.src = avatarUrl;
  
        const name1 = document.getElementById("discord-textname");
        name1.textContent = name;
  
        const statusImg = document.getElementById("discord-status");
        const status1 = document.getElementById("status-1");

        bio = document.getElementById("discord-textbio");
  
        if (status == "dnd") {
          statusImg.src = "assets/icons/status/dnd.png";
        } else if (status == "online") {
          statusImg.src = "assets/icons/status/online.png";
        } else if (status == "idle") {
          statusImg.src = "assets/icons/status/idle.png";
        } else if (status == "offline") {
          statusImg.src = "assets/icons/status/offline.png";
        }
  
        // Loop through activities
        for (const activity of activities) {
          // You can access each activity using the 'activity' variable
          const activityName = activity.name;

          if (activityName == "Custom Status") {

            const state = activity.state;


            const characterCount = state.length;

            if (characterCount > 33) {

                const indexToSplit = 27;

                const part1 = state.substring(0, indexToSplit);
                const part2 = state.substring(indexToSplit);

                console.log(part1 + ' | ' + part2);

                if (activity.emoji) {
                    bio.innerHTML = `
                      <div style="display: flex; position: relative; align-items: center; right: 15px;">
                        <img style="width: 20px; height: 20px; margin-right: 5px;" src="https://cdn.discordapp.com/emojis/${activity.emoji.id}">
                        <span>${part1}...</span>
                      </div>
                    `;
                    bio.title = part1 + part2;

                } else {
                    bio.innerHTML = part1 + '...';
                    bio.title = part1 + part2;

                }
            } else {               

                if (activity.emoji) {
                    bio.innerHTML = `
                      <div style="display: flex; position: relative; align-items: center; right: 15px">
                        <img style="width: 20px; height: 20px; margin-right: 5px;" src="https://cdn.discordapp.com/emojis/${activity.emoji.id}">
                        <span>${state}</span>
                      </div>
                    `;
                } else {
                    bio.textContent = state;
                }
            }

            //console.log(characterCount);


          }
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  
  setInterval(fetchDataAndRefresh, 1000);
  
  
  window.onload = fetchDataAndRefresh;