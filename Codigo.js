
let I = 0;
let ult_erro = 0;

function control(left_sensor, right_sensor, speed) {    

    
    var erro = right_sensor - left_sensor;
    
    var P = erro;
    const Kp = 0.2;
    
    
    I = I + erro;
    const Ki = 0.04;
 
    var D;
    D = erro - ult_erro;
    ult_erro = erro;
    const Kd = 0.4;
    
    var vel = 1000; 
    var angle = P*Kp + I*Ki + D*Kd; // PID dos links do Alex, estudo no outro arquivo

    
//    if (angle > 0.0038 || angle < -0.0038) { Mudar a velocidade antes e depois da curva, dica do Piro
//        vel = 2000;
//    }
//    else {
//        vel = 5000;
//    }
    
    
   
    return {
        engineTorque: vel,
        brakingTorque: 0,
        steeringAngle: angle,
        log: [
            { name: 'Speed', value: speed, min: 0, max: 200 },
            { name: 'Left_sensor', value: left_sensor, min: 0, max: 1 },
            { name: 'Right_sensor', value: right_sensor, min: 0, max: 1 }, // 1 é branco e 0 é preto
            { name: 'SteeringAngle', value: P*Kp , min: -0.79, max: 0.79 }
        ]
    };
}
