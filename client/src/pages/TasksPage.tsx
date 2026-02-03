import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Check } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function TasksPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: '',
  });

  const { data: tasks, isLoading, refetch } = trpc.tasks.list.useQuery();
  const createMutation = trpc.tasks.create.useMutation();
  const updateMutation = trpc.tasks.update.useMutation();
  const deleteMutation = trpc.tasks.delete.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        priority: formData.priority,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      });
      setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
      setIsOpen(false);
      refetch();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleComplete = async (task: any) => {
    try {
      await updateMutation.mutateAsync({
        id: task.id,
        completed: task.completed ? 0 : 1,
      });
      refetch();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-foreground';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'عالية';
      case 'medium':
        return 'متوسطة';
      case 'low':
        return 'منخفضة';
      default:
        return priority;
    }
  };

  const completedTasks = tasks?.filter(t => t.completed) || [];
  const pendingTasks = tasks?.filter(t => !t.completed) || [];

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-cairo font-bold text-[#D4AF8A]">المهام والطلبات</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#D4AF8A] text-background hover:bg-[#E8C4A0] flex items-center gap-2">
                <Plus size={20} />
                مهمة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1A1F3A] border-[#2A2F4A]">
              <DialogHeader>
                <DialogTitle className="text-[#D4AF8A] font-cairo">أضيفي مهمة جديدة</DialogTitle>
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
                  <label className="block text-sm font-amiri text-foreground mb-2">الأولوية</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full bg-[#2A2F4A] border border-[#D4AF8A] text-foreground rounded px-3 py-2"
                  >
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">عالية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-amiri text-foreground mb-2">تاريخ الاستحقاق</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="bg-[#2A2F4A] border-[#D4AF8A] text-foreground"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#D4AF8A] text-background hover:bg-[#E8C4A0]">
                  حفظ المهمة
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

        {isLoading ? (
          <div className="text-center text-muted-foreground">جاري التحميل...</div>
        ) : (
          <div className="space-y-8">
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div>
                <h2 className="text-2xl font-cairo font-bold text-[#D4AF8A] mb-4">المهام المعلقة</h2>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-[#1A1F3A] border border-[#2A2F4A] rounded-lg p-4 hover:border-[#D4AF8A] transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-cairo font-bold text-foreground mb-1">{task.title}</h3>
                          {task.description && (
                            <p className="text-sm font-amiri text-muted-foreground mb-2">{task.description}</p>
                          )}
                          <div className="flex gap-4 text-xs font-amiri">
                            <span className={`${getPriorityColor(task.priority)}`}>
                              أولوية: {getPriorityLabel(task.priority)}
                            </span>
                            {task.dueDate && (
                              <span className="text-muted-foreground">
                                الموعد: {format(new Date(task.dueDate), 'dd MMM', { locale: ar })}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleToggleComplete(task)}
                          >
                            <Check size={16} />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => handleDelete(task.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <h2 className="text-2xl font-cairo font-bold text-[#D4AF8A] mb-4">المهام المكتملة</h2>
                <div className="space-y-3">
                  {completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-[#1A1F3A] border border-[#2A2F4A] rounded-lg p-4 opacity-60"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-cairo font-bold text-foreground mb-1 line-through">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm font-amiri text-muted-foreground mb-2 line-through">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(task.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tasks && tasks.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-lg font-amiri">لا توجد مهام حتى الآن</p>
                <p className="text-sm font-amiri mt-2">ابدأي بإضافة أول مهمة</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
