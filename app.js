console.log('Hello, Dave.');

var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Render = Matter.render,
  Events = Matter.Events,
  Vector = Matter.Vector,
  Body = Matter.Body;

  var engine = Engine.create(document.body);

engine.render.options.wireframes = false
engine.render.options.background = 'black';
var height = $(window).height();
var width = $(window).width();
engine.render.canvas.width = width;
engine.render.canvas.height = height;
  Engine.run(engine);


  var world = engine.world;
  world.bounds.max.y = height;
  world.bounds.max.x = width;
  world.gravity.y = 0.5;



  var SparkFactory = function (firework) {
    var colors = ['rgb(244, 242, 55)', 'rgb(214, 146, 14)', 'rgb(205, 41, 31)'];
    var color = colors[Math.floor(Math.random()*colors.length)];
    return Bodies.circle(firework.position.x, firework.position.y, 2,
      {  render: {strokeStyle: 'grey',
                  fillStyle: color},
      groupId:1,
    },
    1000
    )
  };

  var makeSparks = function (firework, num) {
    var createdSparks=[];

    for (var i = 0; i < num; i++) {
      var spark = SparkFactory(firework)
      createdSparks.push(spark);
      Matter.Body.applyForce(spark, {x:0,y:0}, {x:.0001*(Math.random()-.5), y:.0001*(Math.random()-.5)})
      World.add(world, spark);

      window.setTimeout(function () {
        Matter.Composite.remove(world, createdSparks)
      },300)

    }

    return createdSparks
  }




function makeRocket1 () {



  var rocket1 = Bodies.polygon(width*.8*Math.random(), height, 3, 10,
    { timeScale: 1,
      mass:0.047019304000000005,
      restitution: 1.3,
      friction: 0,
      groupId: 1,
      render:{
        fillStyle: 'rgb(255, 255, 255)',
        strokeStyle: 'rgb(255, 255, 255)'
      }
    }, 1000);

  World.add(world, rocket1)

  Matter.Body.applyForce(rocket1, {
      x: 0,
      y: 0
    }, {
      x: 0.0002*(Math.random()-1),
      y: -.0025 -.0015*Math.random()
    })

  var ID = window.setInterval(function () {
  makeSparks(rocket1, 2)
  }, 40)

  Events.on(engine, "afterTick", function(event) {
    if (rocket1.velocity.y>0) {
        Matter.Composite.remove(world, rocket1);
        window.clearInterval(ID)
    }
  })

}

window.setInterval(function () {
  makeRocket1()
},2000)




  //   var rocket2Base = Bodies.rectangle( width/2, 0, 30, 10);
  //   var rocket2Tip = Bodies.polygon( width/2 +200, 0, 3, 60);
  //   var rocket2 = Body.create(
  //         {
  //               parts: [rocket2Tip,rocket2Base],
  //               position: {x: width/2,
  //                         y: 0}
  //           }
  //
  //         );
  //
  //
  // World.add(world, [rocket2, rocket2Tip])
  // console.log(rocket2);
    // var size = 200;
    //
    //
    //         size = 150;
    //         x = width/2;
    //         y = 300;
    //
    //         var partC = Bodies.circle(x, y, 30),
    //             partD = Bodies.circle(x, y, 30),
    //             partE = Bodies.circle(x, y + size, 30),
    //             partF = Bodies.circle(x, y + size, 30);
    //
    //         var compoundBodyB = Body.create({
    //             parts: [partC, partD, partE, partF]
    //         });
    //
    //
    //         World.add(world, [ compoundBodyB]);
