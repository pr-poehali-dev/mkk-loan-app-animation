import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Icon from '@/components/ui/icon';

interface PhoneAuthProps {
  onSuccess: () => void;
}

export default function PhoneAuth({ onSuccess }: PhoneAuthProps) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    if (phone.length >= 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('code');
      }, 1000);
    }
  };

  const handleVerifyCode = () => {
    if (code.length === 4) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('auth_phone', phone);
        onSuccess();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary gradient-animate flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-5 shadow-lg">
              <Icon name="Home" className="w-14 h-14 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Деньги в Дом
          </h1>
          <p className="text-center text-muted-foreground mb-8 text-base">
            {step === 'phone' ? 'Введите номер телефона' : 'Введите код из СМС'}
          </p>

          {step === 'phone' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 999-99-99"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                  <Icon name="Phone" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <Button
                onClick={handleSendCode}
                disabled={phone.length < 10 || isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Отправка...' : 'Получить код'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Код подтверждения</Label>
                <div className="flex justify-center">
                  <InputOTP maxLength={4} value={code} onChange={setCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Код отправлен на номер {phone}
                </p>
              </div>

              <Button
                onClick={handleVerifyCode}
                disabled={code.length !== 4 || isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? 'Проверка...' : 'Подтвердить'}
              </Button>

              <Button
                onClick={() => setStep('phone')}
                variant="ghost"
                className="w-full"
              >
                Изменить номер
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}