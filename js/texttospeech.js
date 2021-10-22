class TextToSpeech {
	constructor() {
		this.speech = new SpeechSynthesisUtterance();
		this.speech.lang = 'pt-BR';
		this.speech.rate = 1;
		this.speech.pitch = 1;
		this.speech.volume = 1;

		let choosingVoice = setInterval(() => {
			console.log('Trying to get Voices');
			let voices = window.speechSynthesis.getVoices();

			if (voices && voices.length > 0) {
				console.log('Choosing a voice');

				this.speech.voice = voices.filter((voice) => {
					return (
						voice.name.toLowerCase().includes('português') ||
						voice.name.toLowerCase().includes('Brasil')
					);
				})[0];

				if (!this.speech.voice) {
					this.speech.voice = window.speechSynthesis.getVoices()[14];
				}

				console.log(`Chosen voice: ${this.speech.voice}`);
				clearInterval(choosingVoice);

				if (this.speech.voice) alert(this.speech.voice.name);
				else alert('Erro choosing voice');
			}
		}, 10);
	}

	talk(text) {
		this.speech.text = text;
		window.speechSynthesis.speak(this.speech);
	}
}
