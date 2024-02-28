import { Pause, Play } from "@/components/Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton({ id, size = "small" }) {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingAndCurrent = isPlaying && currentMusic?.playlist.id === id;

  function handleClick() {
    if (isPlayingAndCurrent) {
      setIsPlaying(!isPlaying);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { playlist, songs } = data;
        setCurrentMusic({ playlist, song: songs[0], songs });
        setIsPlaying(true);
      });
  }

  const iconSize = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 hover:shadow-lg"
    >
      {isPlayingAndCurrent ? (
        <Pause iconSize={iconSize} />
      ) : (
        <Play iconSize={iconSize} />
      )}
    </button>
  );
}
