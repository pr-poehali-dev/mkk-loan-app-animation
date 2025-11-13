import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Download() {
  const appUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary gradient-animate flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 shadow-xl">
              <Icon name="Home" className="w-16 h-16 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Деньги в Дом
          </h1>
          <p className="text-center text-muted-foreground mb-8 text-base">
            Скачайте приложение на телефон
          </p>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-3xl p-6 mb-6 shadow-inner">
            <div className="bg-white aspect-square rounded-2xl flex items-center justify-center shadow-lg">
              <div className="text-center">
                <Icon name="QrCode" className="w-32 h-32 mx-auto text-primary mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Отсканируйте QR-код</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => window.open(appUrl, '_blank')}
            >
              <Icon name="Smartphone" className="w-5 h-5 mr-2" />
              Открыть приложение
            </Button>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(appUrl);
                alert('Ссылка скопирована!');
              }}
            >
              <Icon name="Copy" className="w-5 h-5 mr-2" />
              Скопировать ссылку
            </Button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="Info" className="w-5 h-5 text-blue-600" />
              Как установить на телефон
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  1
                </div>
                <p>Откройте приложение в браузере Safari (iOS) или Chrome (Android)</p>
              </div>

              <div className="flex gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  2
                </div>
                <p>Нажмите кнопку "Поделиться" или меню (⋮)</p>
              </div>

              <div className="flex gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  3
                </div>
                <p>Выберите "На экран Домой" или "Добавить на главный экран"</p>
              </div>

              <div className="flex gap-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  4
                </div>
                <p>Готово! Теперь приложение доступно с главного экрана</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground mb-3">Доступно на всех устройствах</p>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <Icon name="Apple" className="w-8 h-8 mx-auto mb-1 text-gray-700" fallback="Smartphone" />
                <p className="text-xs text-muted-foreground">iOS</p>
              </div>
              <div className="text-center">
                <Icon name="Smartphone" className="w-8 h-8 mx-auto mb-1 text-gray-700" />
                <p className="text-xs text-muted-foreground">Android</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}