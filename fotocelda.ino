
void setup()
{
Serial.begin(9600);
pinMode(9,OUTPUT); //PWM
}
void loop() 
{ 
// fotocelda
int foto = analogRead(A0);
//Verifica el valor máximo y realizar una conversión
int conversion = 780 - foto;
if ( conversion < 0)
conversion = conversion * -1;
Serial.print(foto);
Serial.print(",");
Serial.println(conversion);
analogWrite(9, conversion);
delay(1000);
}
