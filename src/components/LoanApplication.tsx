import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface LoanApplicationProps {
  onBack: () => void;
}

export default function LoanApplication({ onBack }: LoanApplicationProps) {
  const [amount, setAmount] = useState([15000]);
  const [term, setTerm] = useState([14]);
  const [purpose, setPurpose] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!agreed) {
      toast.error('Необходимо согласие с условиями');
      return;
    }
    if (!purpose) {
      toast.error('Укажите цель займа');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Заявка отправлена на рассмотрение!');
      onBack();
    }, 1500);
  };

  const dailyRate = 1.5;
  const totalAmount = amount[0] + (amount[0] * dailyRate * term[0]) / 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" className="w-6 h-6" />
          </Button>
          <h1 className="font-bold text-lg">Оформление займа</h1>
        </div>
      </header>

      <div className="p-4 space-y-4 pb-24">
        <Card className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Сумма займа</Label>
              <span className="text-2xl font-bold text-primary">
                {amount[0].toLocaleString()} ₽
              </span>
            </div>
            <Slider
              value={amount}
              onValueChange={setAmount}
              min={5000}
              max={50000}
              step={1000}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>5 000 ₽</span>
              <span>50 000 ₽</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Срок займа</Label>
              <span className="text-2xl font-bold text-primary">{term[0]} дней</span>
            </div>
            <Slider
              value={term}
              onValueChange={setTerm}
              min={7}
              max={30}
              step={1}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>7 дней</span>
              <span>30 дней</span>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Сумма займа</span>
              <span className="font-medium">{amount[0].toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Процентная ставка</span>
              <span className="font-medium">{dailyRate}% в день</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Проценты</span>
              <span className="font-medium">
                {((amount[0] * dailyRate * term[0]) / 100).toLocaleString()} ₽
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold">К возврату</span>
                <span className="font-bold text-lg text-primary">
                  {totalAmount.toLocaleString()} ₽
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Цель займа</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Например: на ремонт, покупку техники..."
              className="mt-2"
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(!!checked)} />
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              Я согласен с условиями предоставления займа, графиком платежей и
              даю согласие на обработку персональных данных
            </Label>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !agreed || !purpose}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </div>
    </div>
  );
}
