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
  engine.render.options.background = './image/sky5.jpg';
  var height = $(window).height();
  var width = $(window).width();
  engine.render.canvas.width = width;
  engine.render.canvas.height = height;
  // engine.enableSleeping = true;
  Engine.run(engine);

var world = engine.world;
  world.bounds.max.y = height;
  world.bounds.max.x = width;
  world.gravity.y = 0.5;

function randomElement (array) {
  return array[Math.floor(Math.random()*array.length)];
}

var colors = ['rgb(255, 0, 245)', 'rgb(0, 221, 228)', 'rgb(189, 255, 0)','rgb(0, 235, 16)','rgb(254, 38, 0)','rgb(255, 153, 0)', 'rgb(0, 18, 255)', 'rgb(166, 0, 255)', 'rgb(0, 255, 194)' ]

var makeSparks = function (firework, num) {
    var SparkFactory = function (firework) {
      var fireColors = ['rgb(244, 242, 55)', 'rgb(214, 146, 14)', 'rgb(205, 41, 31)'];
      var color = randomElement(fireColors)
      return Bodies.circle(firework.position.x, firework.position.y, 2.3,
        {  render: {strokeStyle: 'black',
                    fillStyle: color},
            groupId:1,
        },
        1000
      )
    };
    var createdSparks=[];
    for (var i = 0; i < num; i++) {
      var spark = SparkFactory(firework)
      createdSparks.push(spark);
      var force =.0001*(Math.random()-.5)
      Matter.Body.applyForce(spark, {x:0,y:0}, {x:force, y:force})
      World.add(world, spark);
    }
    window.setTimeout(function () {
      Matter.Composite.remove(world, createdSparks)
    },200)
    return createdSparks
}

function sparkLine(firework, num, direction) {
    var SparkFactory = function (firework, color) {
      var color = color;
      return Bodies.circle(firework.position.x, firework.position.y, 3,
        {  render: {strokeStyle: 'black',
                    fillStyle: color
                  },
            groupId:1,
            timeScale: 0.5
        },
        1000
      )
    };
    var createdSparks=[];
    var color = randomElement(colors)
    for (var i = 0; i < num; i++) {
      var spark = SparkFactory(firework, color)
      createdSparks.push(spark);
      var forceCoef= .0019;
      var xForce =forceCoef*(Math.random()-.5)
      var yForce =forceCoef*(Math.random()-.5)
      Matter.Body.applyForce(spark, {x:spark.position.x,y:spark.position.y}, {x:direction*xForce, y:xForce})
      World.add(world, spark);
    };
    window.setTimeout(function () {
      Matter.Composite.remove(world, createdSparks)
    },2200);
    return createdSparks
}

function burst1(firework, num) {
    var SparkFactory = function (firework, color) {
      var color = color;
      return Bodies.circle(firework.position.x, firework.position.y, 3,
        {  render: {strokeStyle: 'black',
                    fillStyle: color
                  },
            groupId:1,
            timeScale: 0.5
        },
        1000
      )
    };
    var createdSparks=[];
    var color = randomElement(colors)
    for (var i = 0; i < num; i++) {
      var spark = SparkFactory(firework, color)
      createdSparks.push(spark);
      var forceCoef= .0019;
      var xForce =forceCoef*(Math.random()-.5)
      var yForce =forceCoef*(Math.random()-.5)
      Matter.Body.applyForce(spark, {x:spark.position.x,y:spark.position.y}, {x:xForce, y:yForce})
      World.add(world, spark);
    };
    window.setTimeout(function () {
      Matter.Composite.remove(world, createdSparks)
    },2200);
    return createdSparks
}

function burst2(firework, num) {
  var SparkFactory = function (firework) {
    return Bodies.circle(firework.position.x, firework.position.y, 5,
      {  render: {strokeStyle: 'black',
                  fillStyle: 'rgb(236, 167, 13)'
                },
          groupId:1,
          mass: 0.047,
          timeScale: 0.4
      },
      1000
    )
  };

  function burst21(spark, num) {

    var miniSparkFactory = function (spark) {
      var color = randomElement(colors)
      return Bodies.circle(spark.position.x, spark.position.y, 2.5,
        {  render: {strokeStyle: 'black',
                    fillStyle: color
                  },
            groupId:1,
            timeScale: 0.5
        },
        1000
      )
    };

    var createdMiniSparks=[];
    for (var i = 0; i < num; i++) {
      var miniSpark = miniSparkFactory(spark)
      createdMiniSparks.push(miniSpark);
      var forceCoef= .001;
      var xForce =forceCoef*(Math.random()-.5)
      var yForce =forceCoef*(Math.random()-.5)
      Matter.Body.applyForce(miniSpark, {x:miniSpark.position.x,y:miniSpark.position.y}, {x:xForce, y:yForce})
      World.add(world, miniSpark);

    }
    window.setTimeout(function () {
      Matter.Composite.remove(world, createdMiniSparks)
    },1400)
  };

    var createdSparkies=[];
    for (var i = 0; i < num; i++) {
      var spark = SparkFactory(firework)
      createdSparkies.push(spark);
      var forceCoef= .003;
      var xForce =forceCoef*(Math.random()-.5)
      var yForce =-0.001+forceCoef*(Math.random()-1)
      Matter.Body.applyForce(spark, {x:spark.position.x,y:spark.position.y}, {x:xForce, y:yForce})
      World.add(world, spark);

    }
    Events.on(engine, "afterTick", function(event) {
      createdSparkies.forEach(function (sparky) {
        sparky.render.fillStyle = randomElement(colors)
      })
  })

    window.setTimeout(function () {
      createdSparkies.forEach(function (spark) {
        burst21(spark, 20)
        Matter.Composite.remove(world, spark);
      })

    },2200)
}

function burst3(firework, num) {
  var SparkFactory = function (firework) {
    return Bodies.circle(firework.position.x, firework.position.y, 5,
      {  render: {strokeStyle: 'black',
                  fillStyle: 'rgb(255, 255, 255)'
                },
          groupId:1,
          mass: 0.047,
          // gravity: {x:0, y:-.5},
          timeScale: 0.4
          // frictionAir: 0.02
      },
      1000
    )
  };
  var createdSparkies=[];
  for (var i = 0; i < num; i++) {
    var spark = SparkFactory(firework)
    createdSparkies.push(spark);
    var forceCoef= .003;
    var xForce =2*forceCoef*(Math.random()-.5)
    var yForce =-0.001+forceCoef*(Math.random()-1)
    Matter.Body.applyForce(spark, {x:spark.position.x,y:spark.position.y}, {x:xForce, y:yForce})
    World.add(world, spark);
  }


  createdSparkies.forEach(function (spark) {


  var ID = window.setInterval(function () {
    var goldBall= Bodies.circle(spark.position.x, spark.position.y, 3,
      {  render: {strokeStyle: 'black',
                  fillStyle: 'rgb(236, 206, 4)'
                },
          groupId:1,
          // isSleeping: false,
          isStatic: true,
      },
      1000
    );
    World.add(world, goldBall);
    window.setTimeout(function () {
      Matter.Composite.remove(world, goldBall);

    },4000) // goldball removal


  }, 100); // end set interval/ goldball creation

  window.setTimeout(function () {
    window.clearInterval(ID)
  }, 4000)
  }) // end for each


    window.setTimeout(function () {
      createdSparkies.forEach(function (spark) {
        Matter.Composite.remove(world, spark);
      })

    },4000)

}

function burst4(firework, num) {
    var SparkFactory = function (firework, color) {
      var color = color;
      return Bodies.circle(firework.position.x, firework.position.y, 3,
        {  render: {strokeStyle: 'black',
                    fillStyle: color
                  },
            groupId:1,
            timeScale: 0.5
        },
        1000
      )
    };
    var createdSparks=[];
    var color = randomElement(colors)
    for (var i = 0; i < num; i++) {
      var spark = SparkFactory(firework, color)
      createdSparks.push(spark);
      var forceCoef= .001;

      var vector = {x: Math.random()-.5, y:Math.random()-.5};
      vector = Vector.normalise(vector);
      vector= Vector.mult(vector, forceCoef)
      Matter.Body.applyForce(spark, {x:spark.position.x,y:spark.position.y}, vector)
      World.add(world, spark);
    };
    window.setTimeout(function () {
      Matter.Composite.remove(world, createdSparks)
    },2200);
    return createdSparks
}



function makeRocket1 () {
  var rocket1 = Bodies.polygon(width*0.1 + width*.8*Math.random(), height, 3, 15,
    { timeScale: 1,
      mass:0.047019304000000005,
      restitution: 1.3,
      friction: 0,
      groupId: 1,
      render:{
        fillStyle: 'rgb(117, 115, 114)',
        strokeStyle: 'rgb(0, 0, 0)'
      }
    }, 1000);

  World.add(world, rocket1)

  Matter.Body.applyForce(rocket1, {
      x: 0,
      y: 0
    }, {
      x: 0.0002*(Math.random()-1),
      y: -.002 -.0008*Math.random()
    })

  var ID = window.setInterval(function () {
  makeSparks(rocket1, 2)
  }, 60)

  Events.on(engine, "afterTick", function(event) {

    if (rocket1.velocity.y>0) {

      switch (randomElement([0,0, 0,1,2]) ) {
        case 0:
        burst1(rocket1, 30);
        break;
        case 1:
        burst2(rocket1, 5)
        break;
        case 2:
        burst3(rocket1, 7)
        break;
        }

      rocket1.velocity.y=-10
        Matter.Composite.remove(world, rocket1);
        window.clearInterval(ID)
    }
  })
}

function makeRocket2 () {
  var rocket1 = Bodies.polygon(width*0.1 + width*.8*Math.random(), height, 3, 15,
    { timeScale: 1,
      mass:0.047019304000000005,
      restitution: 1.3,
      friction: 0,
      groupId: 1,
      torque: 1,
      // timeScale: 0.8,
      render:{
        fillStyle: 'rgb(117, 115, 114)',
        strokeStyle: 'rgb(0, 0, 0)'
      }
    }, 1000);
    console.log(rocket1);

  World.add(world, rocket1)

  Matter.Body.applyForce(rocket1, {
      x: 0,
      y: 0
    }, {
      x: 0.0002*(Math.random()-1),
      y: -.002 -.0008*Math.random()
    })
    var dir = -1;

    window.setTimeout(function () {
      sparkLine(rocket1, 20, dir );
    },100)


  var ID = window.setInterval(function () {
    dir= -1*dir
  sparkLine(rocket1, 20, dir )
}, 400)

  Events.on(engine, "afterTick", function(event) {

    if (rocket1.velocity.y>3) {

        burst4(rocket1, 50);

      rocket1.velocity.y=-10
        Matter.Composite.remove(world, rocket1);
        window.clearInterval(ID)
    }
  })
}

makeRocket1()
var i = 0;
window.setInterval(function () {

  i++;
  window.setTimeout(function () {
    var choose = Math.random();
    if (choose<1/6) {
      makeRocket2()
    }else{
      makeRocket1()
    }
  },Math.random()*4000*i)
},800)
