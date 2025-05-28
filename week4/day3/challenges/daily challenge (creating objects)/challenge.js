class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    watch() {
        return `${this.uploader} watched all ${this.time} seconds of ${this.title}!`;
    }
}

const video1 = new Video("JavaScript Basics", "Alice", 300);
console.log(video1.watch()); // Alice watched all 300 seconds of JavaScript Basics!

const video2 = new Video("Advanced JavaScript", "Bob", 600);    
console.log(video2.watch()); // Bob watched all 600 seconds of Advanced JavaScript!

const videoData = [
    { title: "Classical Music to Cure Brain Rot", uploader: "HALIDONMUSIC", time: 8499 }, // 2:21:39
    { title: "Ruining My Day with INFURIATING Philosophy Takes", uploader: "Unsolicited advice", time: 2069 }, // 34:29
    { title: "How Morocco CRUSHED its Left", uploader: "Fenster", time: 2401 }, // 40:01
    { title: "Why I Left Christianity - Rhett McLaughlin", uploader: "Alex O'Connor", time: 6792 }, // 1:53:12
    { title: "Boring Psychology For Sleep", uploader: "Queen", time: 12170 } // 3:22:50
];

const videos = videoData.map(data => new Video(data.title, data.uploader, data.time));

videos.forEach(video => {
    console.log(video.watch());
});