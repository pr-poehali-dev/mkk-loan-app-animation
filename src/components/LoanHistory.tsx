import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Loan {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  date: string;
}

interface LoanHistoryProps {
  loans: Loan[];
  getStatusBadge: (status: Loan['status']) => JSX.Element;
}

export default function LoanHistory({ loans, getStatusBadge }: LoanHistoryProps) {
  const activeLans = loans.filter(l => l.status === 'active' || l.status === 'pending');
  const completedLoans = loans.filter(l => l.status === 'completed' || l.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 sticky top-0 z-40">
        <h1 className="font-bold text-lg">История заявок</h1>
      </div>

      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="completed">Завершенные</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-3">
            {loans.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="FileText" className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Заявок пока нет</p>
              </Card>
            ) : (
              loans.map(loan => (
                <Card key={loan.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Icon name="Banknote" className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{loan.amount.toLocaleString()} ₽</p>
                        <p className="text-sm text-muted-foreground">Заявка #{loan.id}</p>
                      </div>
                    </div>
                    {getStatusBadge(loan.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" className="w-4 h-4" />
                    <span>{new Date(loan.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-4 space-y-3">
            {activeLans.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="FileText" className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Активных заявок нет</p>
              </Card>
            ) : (
              activeLans.map(loan => (
                <Card key={loan.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Icon name="Banknote" className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{loan.amount.toLocaleString()} ₽</p>
                        <p className="text-sm text-muted-foreground">Заявка #{loan.id}</p>
                      </div>
                    </div>
                    {getStatusBadge(loan.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" className="w-4 h-4" />
                    <span>{new Date(loan.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {completedLoans.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="FileText" className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">Завершенных заявок нет</p>
              </Card>
            ) : (
              completedLoans.map(loan => (
                <Card key={loan.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Icon name="Banknote" className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{loan.amount.toLocaleString()} ₽</p>
                        <p className="text-sm text-muted-foreground">Заявка #{loan.id}</p>
                      </div>
                    </div>
                    {getStatusBadge(loan.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" className="w-4 h-4" />
                    <span>{new Date(loan.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
