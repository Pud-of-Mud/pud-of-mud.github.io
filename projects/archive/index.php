
<!DOCTYPE html>
<html>
    <head>
    <script womginx-processed src="/wombat/dist/wombat.js"></script>
    <script womginx-processed src="/wombat-handler.js" processed-attribute="womginx-processed">
    </script>
        <meta charset="utf-8" />
        <title>Henry Stickman Games</title>
    </head>
    <body>
	<div id="container" style="width:100%;"></div>
	<script>
		window.RufflePlayer = window.RufflePlayer || {};
		window.addEventListener("DOMContentLoaded", (event) => {
			const ruffle = window.RufflePlayer.newest();
			const player = ruffle.create_player();
			const container = document.getElementById("container");
			container.appendChild(player);
			player.stream_swf_url("games/files/");
		});
	</script>
	<script src="ruffle.js"></script>



</body>
</html>

 
