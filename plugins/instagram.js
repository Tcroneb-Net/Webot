
export default {
  name: "instagram",
  alias: ["ig", "insta"],
  description: "Download Instagram media by link",
  category: "media",
  run: () => {
    const userInput = prompt("📥 Enter Instagram post/reel URL:");

    if (!userInput) {
      return "<span style='color:#f66;'>❌ You must enter a link to proceed.</span>";
    }

    const instagramPatterns = [
      /https?:\/\/(?:www\.)?instagram\.com\//,
      /https?:\/\/(?:www\.)?instagr\.am\//,
      /https?:\/\/(?:www\.)?instagram\.com\/p\//,
      /https?:\/\/(?:www\.)?instagram\.com\/reel\//,
      /https?:\/\/(?:www\.)?instagram\.com\/tv\//
    ];

    const isValidUrl = instagramPatterns.some(p => p.test(userInput));

    if (!isValidUrl) {
      return "<span style='color:#f66;'>⚠️ Invalid Instagram link. Please try again with a valid post or reel URL.</span>";
    }

    const encoded = encodeURIComponent(userInput);
    const api = `https://apis-starlights-team.koyeb.app/starlight/igdl?url=${encoded}`;

    fetch(api)
      .then(res => res.json())
      .then(data => {
        if (!data.data || data.data.length === 0) {
          document.getElementById("result").innerHTML = "❌ No media found for that URL.";
          return;
        }

        const mediaList = data.data.map(media => {
          const isVideo = media.url.includes('.mp4') || media.type === 'video';
          return isVideo
            ? \`<video controls width='100%' style='border-radius:12px;margin:10px 0;'><source src='\${media.url}' type='video/mp4'></video>\`
            : \`<img src='\${media.url}' alt='Insta media' style='width:100%;border-radius:12px;margin:10px 0;'>\`;
        });

        document.getElementById("result").innerHTML = mediaList.join("\n") + "<br>✔️ Media loaded.";
      })
      .catch(err => {
        console.error(err);
        document.getElementById("result").innerHTML = "❌ Error fetching Instagram media.";
      });

    return "⏳ Fetching Instagram media...";
  }
};
