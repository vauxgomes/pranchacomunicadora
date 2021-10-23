class TextToSpeech {
	constructor() {
		this.speech = new SpeechSynthesisUtterance();
		this.speech.lang = 'pt-BR';
		this.speech.rate = 1;
		this.speech.pitch = 1;
		this.speech.volume = 1;

		let choosingVoice = setInterval(() => {
			let voices = window.speechSynthesis.getVoices();

			if (voices && voices.length > 0) {
				this.speech.voice = voices.filter((voice) => {
					return (
						voice.name.toLowerCase().includes('português') ||
						voice.name.toLowerCase().includes('brasil') ||
						voice.name.toLowerCase().includes('luciana') // iOs
					);
				})[0];

				clearInterval(choosingVoice);
			}
		}, 10);
	}

	talk(text) {
		this.speech.text = text;
		window.speechSynthesis.speak(this.speech);
	}
}
