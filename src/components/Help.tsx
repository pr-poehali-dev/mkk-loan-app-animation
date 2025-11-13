import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 sticky top-0 z-40">
        <h1 className="font-bold text-lg">Помощь</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-6">
          <h2 className="font-semibold mb-4">Свяжитесь с нами</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="tel:88001234567">
                <Icon name="Phone" className="w-5 h-5 mr-3" />
                8 (800) 123-45-67
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="mailto:support@dengivdom.ru">
                <Icon name="Mail" className="w-5 h-5 mr-3" />
                support@dengivdom.ru
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="MessageCircle" className="w-5 h-5 mr-3" />
              Онлайн-чат
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Как получить займ?</AccordionTrigger>
              <AccordionContent>
                Заполните заявку на главной странице, укажите сумму и срок займа. 
                После одобрения деньги поступят на вашу карту в течение 15 минут.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Какие документы нужны?</AccordionTrigger>
              <AccordionContent>
                Для получения займа необходим паспорт РФ и номер телефона. 
                Загрузите фото основной страницы и страницы с регистрацией.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Какая процентная ставка?</AccordionTrigger>
              <AccordionContent>
                Процентная ставка составляет 1,5% в день. Для первого займа 
                действует специальное предложение - 0% на срок до 7 дней.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Как погасить займ?</AccordionTrigger>
              <AccordionContent>
                Погашение происходит автоматически с привязанной карты в день 
                окончания срока займа. Также можно погасить досрочно без комиссий.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Что делать при просрочке?</AccordionTrigger>
              <AccordionContent>
                При возникновении трудностей с погашением, свяжитесь с нашей службой 
                поддержки. Мы поможем составить индивидуальный график платежей.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Безопасна ли передача данных?</AccordionTrigger>
              <AccordionContent>
                Все данные передаются по защищенному протоколу и хранятся 
                в соответствии с требованиями ФЗ-152 "О персональных данных".
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card className="p-6">
          <h2 className="font-semibold mb-2">Режим работы</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Служба поддержки работает круглосуточно без выходных
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Clock" className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">Доступны 24/7</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
