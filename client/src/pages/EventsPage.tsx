import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'other' as const,
  });

  const { data: events, isLoading, refetch } = trpc.events.list.useQuery();
  const createMutation = trpc.events.create.useMutation();
  const deleteMutation = trpc.events.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        date: new Date(formData.date),
        type: formData.type,
      });
      setFormData({ title: '', description: '', date: new Date().toISOString().split('T')[0], type: 'other' });
      setIsOpen(false);
      refetch();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'anniversary':
        return 'ذكرى';
      case 'birthday':
        return 'عيد ميلاد';
      case 'milestone':
        return 'علامة فارقة';
      case 'other':
        return 'أخرى';
      default:
        return type;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'anniversary':
        return 'bg-pink-500/20 border-pink-500 text-pink-400';
      case 'birthday':
        return 'bg-purple-500/20 border-purple-500 text-purple-400';
      case 'milestone':
        return 'bg-blue-500/20 border-blue-500 text-blue-400';
      case 'other':
        return 'bg-[#D4AF8A]/20 border-[#D4AF8A] text-[#D4AF8A]';
      default:
        return 'bg-[#D4AF8A]/20 border-[#D4AF8A] text-[#D4AF8A]';
    }
  };

  const sortedEvents = events ? [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-cairo font-bold text-[#D4AF8A]">الأحداث المهمة</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#D4AF8A] text-background hover:bg-[#E8C4A0] flex items-center gap-2">
                <Plus size={20} />
                حدث جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1A1F3A] border-[#2A2F4A]">
              <DialogHeader>
                <DialogTitle className="text-[#D4AF8A] font-cairo">أضيفي حدث جديد</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-amiri text-foreground mb-2">العنوان</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-[#2A2F4A] border-[#D4AF8A] text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-amiri text-foreground mb-2">الوصف</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-[#2A2F4A] border-[#D4AF8A] text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-amiri text-foreground mb-2">النوع</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-[#2A2F4A] border border-[#D4AF8A] text-foreground rounded px-3 py-2"
                  >
                    <option value="anniversary">ذكرى</option>
                    <option value="birthday">عيد ميلاد</option>
                    <option value="milestone">علامة فارقة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-amiri text-foreground mb-2">التاريخ</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-[#2A2F4A] border-[#D4AF8A] text-foreground"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#D4AF8A] text-background hover:bg-[#E8C4A0]">
                  حفظ الحدث
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Decorative Line */}
        <div className="flex justify-center mb-12">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
               style={{ boxShadow: '0 0 15px rgba(212, 175, 138, 0.4)' }}>
          </div>
        </div>

        {/* Events Timeline */}
        {isLoading ? (
          <div className="text-center text-muted-foreground">جاري التحميل...</div>
        ) : sortedEvents.length > 0 ? (
          <div className="space-y-6">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#1A1F3A] border border-[#2A2F4A] rounded-lg p-6 hover:border-[#D4AF8A] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="text-[#D4AF8A]" size={20} />
                      <h3 className="text-2xl font-cairo font-bold text-foreground">{event.title}</h3>
                    </div>
                    <p className="text-lg font-amiri text-[#D4AF8A] mb-2">
                      {format(new Date(event.date), 'EEEE, dd MMMM yyyy', { locale: ar })}
                    </p>
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full border text-sm font-cairo ${getEventTypeColor(event.type)}`}>
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-foreground/80 font-amiri">{event.description}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-background"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg font-amiri">لا توجد أحداث حتى الآن</p>
            <p className="text-sm font-amiri mt-2">ابدأي بإضافة أول حدث مهم بيننا</p>
          </div>
        )}
      </div>
    </div>
  );
}
