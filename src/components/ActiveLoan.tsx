import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ActiveLoanProps {
  loan: {
    id: string;
    amount: number;
    returnAmount: number;
    term: number;
    startDate: string;
    endDate: string;
    daysLeft: number;
    paid: number;
  };
}

export default function ActiveLoan({ loan }: ActiveLoanProps) {
  const progress = (loan.paid / loan.returnAmount) * 100;

  const paymentSchedule = [
    { date: '2024-11-15', amount: 5000, status: 'paid' },
    { date: '2024-11-22', amount: 5000, status: 'paid' },
    { date: '2024-11-29', amount: 5225, status: 'upcoming' },
  ];

  const handleDownloadContract = () => {
    toast.success('Договор займа загружен');
  };

  const handleDownloadSchedule = () => {
    toast.success('График платежей загружен');
  };

  const handleViewContract = () => {
    toast.info('Открытие договора займа');
  };

  const handleViewSchedule = () => {
    toast.info('Открытие графика платежей');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b p-4 sticky top-0 z-40 shadow-sm">
        <h1 className="font-bold text-lg">Активный займ</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-6 bg-gradient-to-br from-primary via-accent to-secondary text-white shadow-xl border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/90 text-sm mb-1 font-medium">Сумма к возврату</p>
              <h2 className="text-3xl font-bold">{loan.returnAmount.toLocaleString()} ₽</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <Icon name="Receipt" className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Выдано</span>
              <span className="font-semibold">{loan.amount.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Дата выдачи</span>
              <span className="font-semibold">{new Date(loan.startDate).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Срок погашения</span>
              <span className="font-semibold">{new Date(loan.endDate).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/90">Осталось дней</span>
              <span className="font-semibold text-lg">{loan.daysLeft}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Прогресс погашения</h3>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-4" />
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Оплачено</p>
              <p className="font-semibold text-lg text-primary">{loan.paid.toLocaleString()} ₽</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground mb-1">Осталось</p>
              <p className="font-semibold text-lg">{(loan.returnAmount - loan.paid).toLocaleString()} ₽</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="FileText" className="w-5 h-5 text-primary" />
            Документы по займу
          </h3>
          
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-2">
                    <Icon name="FileText" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Договор займа</p>
                    <p className="text-sm text-muted-foreground">№ {loan.id} от {new Date(loan.startDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
                <Icon name="CheckCircle2" className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleViewContract}
                >
                  <Icon name="Eye" className="w-4 h-4 mr-2" />
                  Просмотреть
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleDownloadContract}
                >
                  <Icon name="Download" className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary to-accent rounded-lg p-2">
                    <Icon name="Calendar" className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">График платежей</p>
                    <p className="text-sm text-muted-foreground">3 платежа по графику</p>
                  </div>
                </div>
                <Icon name="CheckCircle2" className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleViewSchedule}
                >
                  <Icon name="Eye" className="w-4 h-4 mr-2" />
                  Просмотреть
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={handleDownloadSchedule}
                >
                  <Icon name="Download" className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">График платежей</h3>
          <div className="space-y-3">
            {paymentSchedule.map((payment, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${
                      payment.status === 'paid' 
                        ? 'bg-green-100' 
                        : 'bg-blue-100'
                    }`}>
                      <Icon 
                        name={payment.status === 'paid' ? 'CheckCircle2' : 'Clock'} 
                        className={`w-5 h-5 ${
                          payment.status === 'paid' 
                            ? 'text-green-600' 
                            : 'text-blue-600'
                        }`} 
                      />
                    </div>
                    <div>
                      <p className="font-medium">{payment.amount.toLocaleString()} ₽</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    payment.status === 'paid' 
                      ? 'text-green-600' 
                      : 'text-blue-600'
                  }`}>
                    {payment.status === 'paid' ? 'Оплачено' : 'Предстоит'}
                  </div>
                </div>
                {index < paymentSchedule.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <Icon name="Info" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">Важная информация</p>
              <p className="text-blue-700">
                При досрочном погашении займа проценты пересчитываются за фактическое время пользования.
                Для досрочного погашения свяжитесь со службой поддержки.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
