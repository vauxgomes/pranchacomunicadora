class TextToSpeech {
	constructor() {
		this.speech = new SpeechSynthesisUtterance();
		this.speech.lang = 'pt-BR';
		this.speech.rate = 1;
		this.speech.pitch = 1;
		this.speech.volume = 1;

		this.speech.voide = window.speechSynthesis.getVoices().filter(voice => {
			return voice.name.toLowerCase().includes('português') || voice.name.toLowerCase().includes('Brasil')
		})[0]

		if (!this.speech.voice)
			this.speech.voice = window.speechSynthesis.getVoices()[14];
	}

	talk(text) {
		this.speech.text = text;
		window.speechSynthesis.speak(this.speech);
	}
}
