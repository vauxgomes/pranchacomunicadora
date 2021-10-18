class Falador {
	constructor() {
		this.speech = new SpeechSynthesisUtterance();
		this.speech.lang = 'pt-BR';
		this.speech.rate = 1;
		this.speech.pitch = 1;
		this.speech.volume = 1;
		this.speech.voice = window.speechSynthesis.getVoices()[14]; // Português Brasileiro
	}

	falar(texto) {
		this.speech.text = texto;
		window.speechSynthesis.speak(this.speech);
	}
}
