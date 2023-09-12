"use strict"

const track = document.querySelector(".image-container"),
images = document.querySelectorAll(".image")



window.addEventListener("mousedown",e=>{
	track.dataset.mouseDownAt = e.clientX;
})

window.addEventListener("mousemove",e=>{
	if (track.dataset.mouseDownAt === "0") return;

	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
	maxDelta = window.innerWidth / 2;

	let percentage = (mouseDelta / maxDelta) * -100,
	nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
	nextPercentage = Math.max(nextPercentage,-100)
	nextPercentage = Math.min(nextPercentage,0)

	track.dataset.percentage = nextPercentage;

	for (const image of images) {
		//image.style.objectPosition = `${nextPercentage + 100}% 50%`
		image.animate({
			objectPosition: `${nextPercentage + 100}% 50%`
		},{duration: 1200,fill: "forwards"})
	}

	// track.style.transform = `translate(${nextPercentage}%, -50%)`
	track.animate({
		transform: `translate(${nextPercentage}% , -50%)`
	},{duration: 1200,fill: "forwards"})
})

window.addEventListener("mouseup",()=> {
	track.dataset.mouseDownAt = "0"
	track.dataset.prevPercentage = track.dataset.percentage;
})

