let I = 0;
let ult_erro = 0;
let vel = 4000; //definição inicial de algumas variaveis

function control(left_sensor, right_sensor, speed) {    

    
    var erro = right_sensor - left_sensor;
    
    var P = erro;
    const Kp = 0.43; // Variavel de controle proporcional
    
    
    I = I + erro;
    const Ki = 0.04; // Variavel de controle integral
 
    var D;
    D = erro - ult_erro;
    ult_erro = erro;
    const Kd = 0.41; // Variavel de controle derivativa
    
    var angle = P*Kp + I*Ki + D*Kd; // Angulo que será mudado
    console.log('vel:', vel);  //Acompanha velocidade pelo log
    const AnglePar = 0.017; //Angulo de paramêtro para mudança nas velocidades
    
    if ((angle > AnglePar && angle > 0) || (angle < -AnglePar && angle < 0) ){ //Condicional que muda a o enginetorque do carro baseado na sua angulação, mudança linear para o carro não sair voando. No caso 1500 até 4000.
        vel = 1500;
    }
    else {
        vel = 1500 + 2500*(1-((Math.abs(angle)/AnglePar)));
    }
    
    
   
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
