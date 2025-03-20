"use client";
import { MoonIcon, SunIcon, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { usePreferences } from "@/store/usePreferences";
import { useSound } from "use-sound";
import { useEffect } from "react";

const PreferencesTab = () => {
	const { setTheme } = useTheme();

	useEffect(() => {
		setTheme("");
	}, [setTheme]);

	const { soundEnabled, setSoundEnabled } = usePreferences();
	const [playMouseClick] = useSound("/sounds/mouse-click.mp3");
	const [playSoundOn] = useSound("/sounds/sound-on.mp3", { volume: 0.3 });
	const [playSoundOff] = useSound("/sounds/sound-off.mp3", { volume: 0.3 });

	const handleThemeChange = (theme: string) => {
		setTheme(theme);
		if (soundEnabled) {
			playMouseClick();
		}
	};

	const handleSoundToggle = () => {
		setSoundEnabled(!soundEnabled);
		if (soundEnabled) {
			playSoundOff();
		} else {
			playSoundOn();
		}
	};

	return (
		<div className='flex flex-wrap gap-2 px-1 md:px-2'>
			<Button
				variant={"outline"}
				size={"icon"}
				onClick={() => handleThemeChange("light")}
			>
				<SunIcon className='size-[1.2rem] text-muted-foreground' />
			</Button>
			<Button
				variant={"outline"}
				size={"icon"}
				onClick={() => handleThemeChange("dark")}
			>
				<MoonIcon className='size-[1.2rem] text-muted-foreground' />
			</Button>
			<Button
				variant={"outline"}
				size={"icon"}
				onClick={handleSoundToggle}
			>
				{soundEnabled ? (
					<Volume2 className='size-[1.2rem] text-muted-foreground' />
				) : (
					<VolumeX className='size-[1.2rem] text-muted-foreground' />
				)}
			</Button>
		</div>
	);
};
export default PreferencesTab;