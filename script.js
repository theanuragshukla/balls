const cnvs = document.getElementById("cnvs")
const ctx = cnvs.getContext('2d')
cnvs.height=innerHeight
cnvs.width=innerWidth
const balls = []
const colors = ["red","blue", "green", "orange", "lime"]
ctx.fillStyle="red"
class Ball {
	constructor({position,velocity,radius, color}){
		this.position=position;
		this.velocity=velocity;
		this.radius=radius
		this.color=color
	}
	draw (){
		ctx.beginPath()
		ctx.fillStyle=this.color
		ctx.arc(this.position.x,this.position.y,this.radius, 0, Math.PI*2,true)
		ctx.fill()
	}

	update(){
		if(this.position.x+this.radius>=cnvs.width || this.position.x-this.radius<=0){
			this.velocity.x*=-1
		}
		if(this.position.y+this.radius>=cnvs.height || this.position.y-this.radius<=0){
			this.velocity.y*=-1
		}

		this.position.x+=this.velocity.x
		this.position.y+=this.velocity.y
		this.draw()
	}
}
window.onload = () => {
	for(let i = 0;i<100;i++){
		const ball = new Ball({
			position:{
				x:10+Math.random()*(cnvs.width-10),
				y:10+Math.random()*(cnvs.height-10)
			},
			radius:10,
			color:colors[Math.floor(Math.random()*colors.length)],
			velocity:{
				x:-5+Math.random()*10,
				y:-5+Math.random()*10
			}
		})
		balls.push(ball)
	}

	driver()
}

const driver = () => {
	ctx.clearRect(0,0,cnvs.width, cnvs.height)
	balls.map(b=>{
		b.update()
	})
	requestAnimationFrame(driver)
}
