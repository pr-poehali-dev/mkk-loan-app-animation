import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function ClientData() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({
    fullName: 'Иванов Иван Иванович',
    birthDate: '1990-01-15',
    passport: '4512 345678',
    address: 'г. Москва, ул. Примерная, д. 1, кв. 1',
    email: 'ivanov@example.com',
    phone: localStorage.getItem('auth_phone') || '',
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success('Данные успешно сохранены');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">Данные клиента</h1>
          {!isEditing && (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Icon name="Pencil" className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 rounded-full p-4">
              <Icon name="User" className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{data.fullName}</h2>
              <p className="text-sm text-muted-foreground">ID: {data.phone.slice(-4)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>ФИО</Label>
              <Input
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Дата рождения</Label>
              <Input
                type="date"
                value={data.birthDate}
                onChange={(e) => setData({ ...data, birthDate: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Паспорт</Label>
              <Input
                value={data.passport}
                onChange={(e) => setData({ ...data, passport: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Адрес регистрации</Label>
              <Input
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Телефон</Label>
              <Input value={data.phone} disabled className="mt-1" />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave} disabled={isSaving} className="flex-1">
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Отмена
              </Button>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Документы</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="FileText" className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Паспорт (главная)</p>
                  <p className="text-xs text-muted-foreground">Загружено 01.11.2024</p>
                </div>
              </div>
              <Icon name="Check" className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon name="FileText" className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Паспорт (прописка)</p>
                  <p className="text-xs text-muted-foreground">Загружено 01.11.2024</p>
                </div>
              </div>
              <Icon name="Check" className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
