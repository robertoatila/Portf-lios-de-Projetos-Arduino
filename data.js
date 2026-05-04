const projectsData = [
    {
        id: "piscante",
        title: "PISCANTE.ino",
        difficulty: "Iniciante",
        difficultyLevel: 1,
        components: ["1× Arduino Uno", "4× LEDs", "4× Resistores 220Ω", "1× Protoboard"],
        concepts: ["Saídas digitais", "Temporização", "Função delay()"],
        description: "O clássico 'Blink'. Uma introdução perfeita às saídas digitais, ensinando o microcontrolador a ligar e desligar um componente no seu próprio ritmo.",
        code: `int led1 = A1;
int led2 = A2;
int led3 = A3;
int led4 = A4;
void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);
  digitalWrite(led3, HIGH);
  digitalWrite(led4, HIGH);
  delay(3000);
}

void loop() {
  digitalWrite(led1, HIGH); 
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW); 
  digitalWrite(led4, LOW); 
  delay(500);  
  
  digitalWrite(led1, LOW);  
  digitalWrite(led2, HIGH); 
  digitalWrite(led3, LOW);
  digitalWrite(led4, LOW);
  delay(500);   
  
  digitalWrite(led1, LOW);  // Turn off led1
  digitalWrite(led2, LOW); // Turn on led2
  digitalWrite(led3, HIGH);
  digitalWrite(led4, LOW);
  delay(500);  

  digitalWrite(led1, LOW);  // Turn off led1
  digitalWrite(led2, LOW); // Turn on led2
  digitalWrite(led3, LOW);
  digitalWrite(led4, HIGH);
  delay(500);  
}`
    },
    {
        id: "for",
        title: "FOR.ino",
        difficulty: "Iniciante",
        difficultyLevel: 1,
        components: ["1× Arduino Uno", "4× LEDs", "4× Resistores 220Ω", "1× Protoboard"],
        concepts: ["Laços for", "Arrays", "Lógica condicional"],
        description: "Uso de laços de repetição 'for' para controlar múltiplos componentes de forma eficiente. Excelente para criar sequências de LEDs.",
        code: `int led[] = {A1, A2, A3, A4};
void setup() {
  for (int i = 0; i < 4; i++) {
    pinMode(led[i], OUTPUT);
  }
  for (int i = 0; i < 4; i++) {
  digitalWrite(led[i], HIGH);  
  }
  delay(3000); 
}
void loop() {
  for (int i = 0; i < 4; i++) {
    digitalWrite(led[i], HIGH);  
    for (int v = 0; v < 4; v++) {
      if (v != i) {
        digitalWrite(led[v], LOW);  
      }
    }
    delay(500);  
  }
}`
    },
    {
        id: "semaforo",
        title: "SEMAFORODOLA_ANHA.ino",
        difficulty: "Iniciante",
        difficultyLevel: 1,
        components: ["1× Arduino Uno", "4× LEDs (vermelho, amarelo, verde)", "4× Resistores 220Ω", "1× Protoboard"],
        concepts: ["Máquina de estados", "Temporização sequencial", "Simulação de semáforo"],
        description: "Lógica de controle de tempo simulando um cruzamento de trânsito. Um mergulho na temporização e coordenação de atuadores.",
        code: `int led1 = A1;
int led2 = A2;
int led3 = A3;
int led4 = A4;
void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);
  digitalWrite(led3, HIGH);
  digitalWrite(led4, HIGH);
  delay(3000);
}

void loop() {
  digitalWrite(led1, HIGH); 
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW); 
  digitalWrite(led4, LOW); 
  delay(2000);  
  
  digitalWrite(led1, HIGH);  
  digitalWrite(led2, HIGH); 
  digitalWrite(led3, LOW);
  digitalWrite(led4, LOW);
  delay(2000);   
  
  digitalWrite(led1, HIGH); 
  digitalWrite(led2, LOW); 
  digitalWrite(led3, HIGH);
  digitalWrite(led4, LOW);
  delay(2000);  

  digitalWrite(led1, HIGH); 
  digitalWrite(led2, LOW); 
  digitalWrite(led3, LOW);
  digitalWrite(led4, HIGH);
  delay(2000);  
}`
    },
    {
        id: "mario",
        title: "MARIO.ino",
        difficulty: "Intermediário",
        difficultyLevel: 2,
        components: ["1× Arduino Uno", "1× Buzzer piezoelétrico", "4× LEDs", "4× Resistores 220Ω", "1× Protoboard"],
        concepts: ["Geração de áudio", "Função tone()", "Arrays de melodia", "Sincronização LED-som"],
        description: "A magia da geração de áudio! Reprodução do inesquecível tema do Super Mario Bros controlando as frequências em um buzzer piezoelétrico.",
        code: `#define buzzer 3
#define led1 A1
#define led2 A2
#define led3 A3
#define led4 A4

// --- Notas ---
#define NOTE_B0 31
#define NOTE_C1 33
#define NOTE_CS1 35
#define NOTE_D1 37
#define NOTE_DS1 39
#define NOTE_E1 41
#define NOTE_F1 44
#define NOTE_FS1 46
#define NOTE_G1 49
#define NOTE_GS1 52
#define NOTE_A1 55
#define NOTE_AS1 58
#define NOTE_B1 62
#define NOTE_C2 65
#define NOTE_CS2 69
#define NOTE_D2 73
#define NOTE_DS2 78
#define NOTE_E2 82
#define NOTE_F2 87
#define NOTE_FS2 93
#define NOTE_G2 98
#define NOTE_GS2 104
#define NOTE_A2 110
#define NOTE_AS2 117
#define NOTE_B2 123
#define NOTE_C3 131
#define NOTE_CS3 139
#define NOTE_D3 147
#define NOTE_DS3 156
#define NOTE_E3 165
#define NOTE_F3 175
#define NOTE_FS3 185
#define NOTE_G3 196
#define NOTE_GS3 208
#define NOTE_A3 220
#define NOTE_AS3 233
#define NOTE_B3 247
#define NOTE_C4 262
#define NOTE_CS4 277
#define NOTE_D4 294
#define NOTE_DS4 311
#define NOTE_E4 330
#define NOTE_F4 349
#define NOTE_FS4 370
#define NOTE_G4 392
#define NOTE_GS4 415
#define NOTE_A4 440
#define NOTE_AS4 466
#define NOTE_B4 494
#define NOTE_C5 523
#define NOTE_CS5 554
#define NOTE_D5 587
#define NOTE_DS5 622
#define NOTE_E5 659
#define NOTE_F5 698
#define NOTE_FS5 740
#define NOTE_G5 784
#define NOTE_GS5 831
#define NOTE_A5 880
#define NOTE_AS5 932
#define NOTE_B5 988
#define NOTE_C6 1047
#define NOTE_CS6 1109
#define NOTE_D6 1175
#define NOTE_DS6 1245
#define NOTE_E6 1319
#define NOTE_F6 1397
#define NOTE_FS6 1480
#define NOTE_G6 1568
#define NOTE_GS6 1661
#define NOTE_A6 1760
#define NOTE_AS6 1865
#define NOTE_B6 1976
#define NOTE_C7 2093
#define NOTE_CS7 2217
#define NOTE_D7 2349
#define NOTE_DS7 2489
#define NOTE_E7 2637
#define NOTE_F7 2794
#define NOTE_FS7 2960
#define NOTE_G7 3136
#define NOTE_GS7 3322
#define NOTE_A7 3520
#define NOTE_AS7 3729
#define NOTE_B7 3951
#define NOTE_C8 4186
#define REST 0

// --- Melodia principal (Super Mario Theme) ---
int melody[] = {
  NOTE_E7, NOTE_E7, REST, NOTE_E7,
  REST, NOTE_C7, NOTE_E7, REST,
  NOTE_G7, REST, REST, REST,
  NOTE_G6, REST, REST, REST,

  NOTE_C7, REST, NOTE_G6, REST,
  NOTE_E6, REST, NOTE_A6, REST,
  NOTE_B6, REST, NOTE_AS6, NOTE_A6,
  NOTE_G6, NOTE_E7, NOTE_G7,
  NOTE_A7, REST, NOTE_F7, NOTE_G7,
  REST, NOTE_E7, REST, NOTE_C7,
  NOTE_D7, NOTE_B6, REST,

  NOTE_G7, NOTE_FS7, NOTE_F7, NOTE_DS7,
  NOTE_E7, REST, NOTE_GS6, NOTE_A6, NOTE_C7,
  REST, NOTE_A6, NOTE_C7, NOTE_D7,
  REST, NOTE_G7, NOTE_FS7, NOTE_F7, NOTE_DS7,
  NOTE_E7, REST, NOTE_C8, NOTE_C8, NOTE_C8
};

// --- Duração das notas ---
int noteDurations[] = {
  8,8,8,8,8,8,8,8,
  4,8,8,8,4,8,8,8,
  8,8,8,8,8,8,8,8,
  8,8,8,8,8,8,8,8,
  8,8,8,8,8,8,8,8,
  8,8,8,8,8,8,8,8,
  8,8,8,8,8,8,8,8,
  8,8,8,8,8,8,8,8, 1
};

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  // Verifique o número de notas e durações
  int notes = sizeof(melody) / sizeof(melody[0]);
  int durations = sizeof(noteDurations) / sizeof(noteDurations[0]);

  // Verifique se o número de notas e durações são iguais
  if (notes != durations) {
    // Caso não seja igual, algo está errado com a quantidade de notas e durações
    return;  // Sai da função loop para evitar problemas
  }

  for (int i = 0; i < notes; i++) {
    int duration = 1000 / noteDurations[i];
    int note = melody[i];

    if (note != REST) {
      tone(buzzer, note, duration);  // Toca o som no buzzer

      // Sincroniza LEDs com a nota
      if (note >= NOTE_C8) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, HIGH);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, HIGH);
      } else if (note >= NOTE_G7) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, LOW);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, LOW);
      } else if (note >= NOTE_E7) {
        digitalWrite(led1, LOW);
        digitalWrite(led2, HIGH);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, LOW);
      } else if (note >= NOTE_C7) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, LOW);
        digitalWrite(led3, LOW);
        digitalWrite(led4, HIGH);
      } else {
        digitalWrite(led1, LOW);
        digitalWrite(led2, LOW);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, HIGH);
      }
    } else {
      noTone(buzzer);  // Para o som se não houver nota
      digitalWrite(led1, LOW);
      digitalWrite(led2, LOW);
      digitalWrite(led3, LOW);
      digitalWrite(led4, LOW);
    }

    delay(duration * 1.45);  // Ajusta o tempo entre as notas
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    digitalWrite(led4, LOW);
  }

  // Final de vitória com LEDs piscando
  for (int j = 0; j < 3; j++) {
    digitalWrite(led1, HIGH);
    digitalWrite(led2, HIGH);
    digitalWrite(led3, HIGH);
    digitalWrite(led4, HIGH);
    delay(180);
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    digitalWrite(led4, LOW);
    delay(180);
  }

  delay(3000); // Pausa antes de repetir
}`
    },
    {
        id: "marcha_imperial",
        title: "marchaImperial.ino",
        difficulty: "Intermediário",
        difficultyLevel: 2,
        components: ["1× Arduino Uno", "1× Buzzer piezoelétrico", "4× LEDs", "4× Resistores 220Ω", "1× Protoboard"],
        concepts: ["Geração de áudio", "Temporização musical", "Controle de LEDs sincronizado"],
        description: "O poder do Lado Sombrio da Força. A icônica Marcha Imperial (Star Wars) tocada no buzzer, sincronizada com LEDs simulando sabres de luz.",
        code: `#define buzzer 3
#define led1 A1
#define led2 A2
#define led3 A3
#define led4 A4

// --- Notas ---
#define NOTE_C4  262
#define NOTE_F4  349
#define NOTE_GS4 415
#define NOTE_A4  440
#define NOTE_C5  523
#define NOTE_E5  659
#define NOTE_F5  698
#define REST 0

// --- Melodia principal (Marcha Imperial de Star Wars) ---
int melody[] = {
  NOTE_A4, NOTE_A4, NOTE_A4, NOTE_F4, NOTE_C5,
  NOTE_A4, NOTE_F4, NOTE_C5, NOTE_A4, REST,
  NOTE_E5, NOTE_E5, NOTE_E5, NOTE_F5, NOTE_C5,
  NOTE_GS4, NOTE_F4, NOTE_C5, NOTE_A4, REST
};

// --- Duração das notas ---
// 4 = semínima, 8 = colcheia, 16 = semicolcheia, 2 = mínima
int noteDurations[] = {
  4, 4, 4, 8, 16,
  4, 8, 16, 2, 4,
  4, 4, 4, 8, 16,
  4, 8, 16, 2, 2
};

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  int notes = sizeof(melody) / sizeof(melody[0]);
  int durations = sizeof(noteDurations) / sizeof(noteDurations[0]);

  // Trava de segurança: verifica se o número de notas e durações são iguais
  if (notes != durations) {
    return;  
  }

  // Define a velocidade da música (ajuste se quiser mais rápido ou mais lento)
  int tempo = 1200; 

  for (int i = 0; i < notes; i++) {
    int duration = tempo / noteDurations[i];
    int note = melody[i];

    if (note != REST) {
      tone(buzzer, note, duration);  // Toca o som no buzzer

      // Sincroniza LEDs com a nota da Marcha Imperial
      if (note >= NOTE_F5) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, HIGH);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, HIGH);
      } else if (note >= NOTE_E5) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, LOW);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, LOW);
      } else if (note >= NOTE_C5) {
        digitalWrite(led1, LOW);
        digitalWrite(led2, HIGH);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, LOW);
      } else if (note >= NOTE_A4) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, LOW);
        digitalWrite(led3, LOW);
        digitalWrite(led4, HIGH);
      } else {
        digitalWrite(led1, LOW);
        digitalWrite(led2, LOW);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, HIGH);
      }
    } else {
      noTone(buzzer);  
      digitalWrite(led1, LOW);
      digitalWrite(led2, LOW);
      digitalWrite(led3, LOW);
      digitalWrite(led4, LOW);
    }

    // Pausa entre as notas para não ficarem "grudadas"
    delay(duration * 1.30);  
    
    // Apaga os LEDs brevemente entre as notas
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    digitalWrite(led4, LOW);
  }

  // Efeito de LEDs piscando ao estilo "Lado Negro da Força" no final
  for (int j = 0; j < 3; j++) {
    digitalWrite(led1, HIGH);
    digitalWrite(led2, HIGH);
    digitalWrite(led3, HIGH);
    digitalWrite(led4, HIGH);
    delay(200);
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    digitalWrite(led4, LOW);
    delay(200);
  }

  delay(3000); // Pausa de 3 segundos antes de repetir a marcha
}`
    },
    {
        id: "got",
        title: "gameofthrones.ino",
        difficulty: "Intermediário",
        difficultyLevel: 2,
        components: ["1× Arduino Uno", "1× Buzzer piezoelétrico", "4× LEDs", "4× Resistores 220Ω", "1× Protoboard"],
        concepts: ["Geração de áudio", "Notas graves", "Efeitos visuais dramáticos"],
        description: "O inverno chegou. O tema épico de Game of Thrones transcrito para Arduino, usando notas mais graves no buzzer e um balé de LEDs dramáticos.",
        code: `#define buzzer 3
#define led1 A1
#define led2 A2
#define led3 A3
#define led4 A4

// --- Notas utilizadas na melodia ---
#define NOTE_AS3 233
#define NOTE_C4  262
#define NOTE_D4  294
#define NOTE_DS4 311
#define NOTE_F4  349
#define NOTE_G4  392
#define REST 0

// --- Melodia principal (Game of Thrones) ---
int melody[] = {
  NOTE_G4, NOTE_C4, NOTE_DS4, NOTE_F4, NOTE_G4, NOTE_C4, NOTE_DS4, NOTE_F4,
  NOTE_D4, REST,
  
  NOTE_G4, NOTE_C4, NOTE_DS4, NOTE_F4, NOTE_G4, NOTE_C4, NOTE_DS4, NOTE_F4,
  NOTE_D4, REST,
  
  NOTE_F4, NOTE_AS3, NOTE_DS4, NOTE_D4, NOTE_F4, NOTE_AS3, NOTE_DS4, NOTE_D4,
  NOTE_C4, REST
};

// --- Duração das notas ---
// 4 = semínima, 8 = colcheia, 2 = mínima
int noteDurations[] = {
  4, 4, 8, 8, 4, 4, 8, 8,
  2, 4,
  
  4, 4, 8, 8, 4, 4, 8, 8,
  2, 4,
  
  4, 4, 8, 8, 4, 4, 8, 8,
  2, 4
};

void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  int notes = sizeof(melody) / sizeof(melody[0]);
  int durations = sizeof(noteDurations) / sizeof(noteDurations[0]);

  // Trava de segurança
  if (notes != durations) {
    return;  
  }

  // Velocidade da música (Game of Thrones é um pouco mais arrastada)
  int tempo = 1500; 

  for (int i = 0; i < notes; i++) {
    int duration = tempo / noteDurations[i];
    int note = melody[i];

    if (note != REST) {
      tone(buzzer, note, duration);

      // Sincroniza LEDs com a nota de Game of Thrones
      if (note >= NOTE_G4) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, HIGH);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, HIGH);
      } else if (note >= NOTE_F4) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, LOW);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, LOW);
      } else if (note >= NOTE_DS4) {
        digitalWrite(led1, LOW);
        digitalWrite(led2, HIGH);
        digitalWrite(led3, LOW);
        digitalWrite(led4, HIGH);
      } else if (note >= NOTE_C4) {
        digitalWrite(led1, HIGH);
        digitalWrite(led2, LOW);
        digitalWrite(led3, LOW);
        digitalWrite(led4, LOW);
      } else {
        // Notas mais graves (como AS3)
        digitalWrite(led1, LOW);
        digitalWrite(led2, LOW);
        digitalWrite(led3, HIGH);
        digitalWrite(led4, HIGH);
      }
    } else {
      noTone(buzzer);  
      digitalWrite(led1, LOW);
      digitalWrite(led2, LOW);
      digitalWrite(led3, LOW);
      digitalWrite(led4, LOW);
    }

    // Pausa dramática entre as notas
    delay(duration * 1.30);  
    
    // Apaga os LEDs brevemente entre as notas
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    digitalWrite(led4, LOW);
  }

  // Final dramático: os LEDs apagam e acendem lentamente, como uma fogueira apagando
  for (int j = 0; j < 2; j++) {
    digitalWrite(led1, HIGH);
    digitalWrite(led4, HIGH);
    delay(400);
    digitalWrite(led2, HIGH);
    digitalWrite(led3, HIGH);
    delay(400);
    digitalWrite(led1, LOW);
    digitalWrite(led4, LOW);
    delay(400);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    delay(400);
  }

  delay(4000); // Pausa de 4 segundos para manter o clima épico antes do loop recomeçar
}`
    },
    {
        id: "apac",
        title: "APAC.ino",
        difficulty: "Intermediário",
        difficultyLevel: 2,
        components: ["1× Arduino Uno", "4× LEDs", "4× Resistores 220Ω", "1× Protoboard"],
        concepts: ["Controle sequencial", "Temporização", "Coordenação de atuadores"],
        description: "Um projeto avançado de integração e controle. Este código consolida leituras de sensores e acionamento de múltiplos relés para um sistema autônomo completo.",
        code: `int led1 = A1;
int led2 = A2;
int led3 = A3;
int led4 = A4;
void setup() {
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  digitalWrite(led1, HIGH);
  digitalWrite(led2, HIGH);
  digitalWrite(led3, HIGH);
  digitalWrite(led4, HIGH);
  delay(3000);
}

void loop() {
  digitalWrite(led1, HIGH); 
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW); 
  digitalWrite(led4, LOW); 
  delay(2000);  
  
  digitalWrite(led1, LOW);  
  digitalWrite(led2, HIGH); 
  digitalWrite(led3, LOW);
  digitalWrite(led4, LOW);
  delay(2000);   
  
  digitalWrite(led1, LOW);  // Turn off led1
  digitalWrite(led2, LOW); // Turn on led2
  digitalWrite(led3, HIGH);
  digitalWrite(led4, LOW);
  delay(2000);  

  digitalWrite(led1, LOW);  // Turn off led1
  digitalWrite(led2, LOW); // Turn on led2
  digitalWrite(led3, LOW);
  digitalWrite(led4, HIGH);
  delay(2000);  
}`
    },
    {
        id: "carrinho",
        title: "CARRINHO.ino",
        difficulty: "Avançado",
        difficultyLevel: 3,
        components: ["1× Arduino Uno", "2× Motores DC", "1× Ponte H (L298N)", "2× Sensores infravermelhos", "1× Chassi robótico"],
        concepts: ["Robótica móvel", "Leitura de sensores", "Lógica de navegação", "Controle de motores"],
        description: "Lógica de controle para um robô móvel autônomo. O código gerencia motores DC e sensores para navegação e desvio de obstáculos em tempo real.",
        code: `int e,d;
void setup()
{
  pinMode(10,OUTPUT);
  pinMode(11,OUTPUT);
  pinMode(12,OUTPUT);
  pinMode(13,OUTPUT);
  pinMode(2,INPUT);
  pinMode(3,INPUT);
}
void loop()
{
  d=digitalRead(2); 
  e=digitalRead(3);
  if(d==HIGH && e==HIGH)
  {
    digitalWrite(10,HIGH);
    digitalWrite(11,LOW);
    digitalWrite(12,HIGH);
    digitalWrite(13,LOW);
  }
  else if(d==HIGH && e==LOW)
  {
    digitalWrite(10,HIGH);
    digitalWrite(11,LOW);
    digitalWrite(12,HIGH);
    digitalWrite(13,HIGH);
  }
  else if(d==LOW && e==HIGH)
  {
    digitalWrite(10,HIGH);
    digitalWrite(11,HIGH);
    digitalWrite(12,HIGH);
    digitalWrite(13,LOW);
  }
  else if(d==LOW && e==LOW)
  {
    digitalWrite(10,HIGH);
    digitalWrite(11,HIGH);
    digitalWrite(12,HIGH);
    digitalWrite(13,HIGH);
  }
  delay(100);
}`
    },
    {
        id: "cozinha_inteligente",
        title: "COZINHA_INTELIGENTE.ino",
        difficulty: "Avançado",
        difficultyLevel: 3,
        components: ["1× Arduino Uno", "1× Sensor ultrassônico HC-SR04", "1× Sensor PIR", "1× Sensor de gás MQ-2", "1× Sensor de temperatura", "1× Servo motor", "2× LEDs", "1× Buzzer"],
        concepts: ["Automação residencial", "Múltiplos sensores", "Servo motor", "Comunicação serial", "Biblioteca Servo.h"],
        description: "Sistema completo de automação para cozinha inteligente. Integra controle de armários via ultrassônico, detecção de gás, temperatura e iluminação automática por presença.",
        code: `#include <Servo.h>

int Cabinet = 0;
int PIRS = 0;
int Gass = 0;
int Temps = 0;

long readUltrasonicDistance(int triggerPin, int echoPin)
{
  pinMode(triggerPin, OUTPUT);  
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  pinMode(echoPin, INPUT);
  return pulseIn(echoPin, HIGH);
}

Servo servo_5;

void setup()
{
  Serial.begin(9600);
  servo_5.attach(5, 500, 2500);
  pinMode(10, INPUT);
  pinMode(9, OUTPUT);
  pinMode(7, OUTPUT);
  pinMode(A1, INPUT);
  pinMode(6, OUTPUT);
  pinMode(A0, INPUT);
  pinMode(4, OUTPUT);
}

void loop()
{
  Cabinet = 0.01723 * readUltrasonicDistance(3, 3);
  Serial.println(Cabinet);
  if (Cabinet < 15) {
    servo_5.write(90);
    delay(5000); 
  } else {
    servo_5.write(0);
  }
  PIRS = digitalRead(10);
  Serial.println(PIRS);
  if (PIRS == HIGH) {
    digitalWrite(9, HIGH);
    digitalWrite(7, HIGH);
  } else {
    digitalWrite(9, LOW);
    digitalWrite(7, LOW);
  }
  Temps = (-40 + 0.488155 * (analogRead(A1) - 20));
  Serial.println(Temps);
  if (Temps >= 30) {
    digitalWrite(6, HIGH);
  } else {
    digitalWrite(6, LOW);
  }
  Gass = analogRead(A0);
  Serial.println(Gass);
  if (Gass >= 220) {
    digitalWrite(4, HIGH);
  } else {
    digitalWrite(4, LOW);
  }
}`
    }
];
