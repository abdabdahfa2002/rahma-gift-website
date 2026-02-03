import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { toast } from 'sonner';

export default function MemoriesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
  });

  const { data: memories, isLoading, refetch } = trpc.memories.list.useQuery();
  const createMutation = trpc.memories.create.useMutation();
  const deleteMutation = trpc.memories.delete.useMutation();
  const uploadMutation = trpc.upload.uploadFile.useMutation();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      const result = await uploadMutation.mutateAsync({
        fileData: new Uint8Array(buffer) as any,
        fileName: file.name,
        folder: 'memories',
      });

      setUploadedFile({ url: result.url, name: file.name });
      setFormData({ ...formData, imageUrl: result.url });
      toast.success('تم رفع الملف بنجاح!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('فشل رفع الملف');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({
        title: formData.title,
        description: formData.description || undefined,
        imageUrl: formData.imageUrl || undefined,
        date: new Date(formData.date),
      });
      setFormData({ title: '', description: '', imageUrl: '', date: new Date().toISOString().split('T')[0] });
      setUploadedFile(null);
      setIsOpen(false);
      refetch();
      toast.success('تم حفظ الذكرية بنجاح!');
    } catch (error) {
      console.error('Error creating memory:', error);
      toast.error('فشل حفظ الذكرية');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      refetch();
      toast.success('تم حذف الذكرية');
    } catch (error) {
      console.error('Error deleting memory:', error);
      toast.error('فشل حذف الذكرية');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-cairo font-bold text-[#D4AF8A]">الذكريات الجميلة</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#D4AF8A] text-background hover:bg-[#E8C4A0] flex items-center gap-2">
                <Plus size={20} />
                ذكرية جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1A1F3A] border-[#2A2F4A] max-w-md">
              <DialogHeader>
                <DialogTitle className="text-[#D4AF8A] font-cairo">أضيفي ذكرية جديدة</DialogTitle>
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
                  <label className="block text-sm font-amiri text-foreground mb-2">التاريخ</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-[#2A2F4A] border-[#D4AF8A] text-foreground"
                    required
                  />
                </div>

                {/* File Upload Section */}
                <div className="border-2 border-dashed border-[#D4AF8A] rounded-lg p-4">
                  <label className="block text-sm font-amiri text-foreground mb-3">رفع صورة أو ملف</label>
                  {uploadedFile ? (
                    <div className="bg-[#2A2F4A] p-3 rounded flex items-center justify-between">
                      <span className="text-sm text-[#D4AF8A] truncate">{uploadedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedFile(null);
                          setFormData({ ...formData, imageUrl: '' });
                        }}
                        className="text-red-500 hover:text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex items-center justify-center gap-2 text-[#D4AF8A] hover:text-[#E8C4A0] transition-colors">
                        <Upload size={20} />
                        <span className="text-sm font-amiri">اضغطي لرفع ملف</span>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                    </label>
                  )}
                  {isUploading && <p className="text-xs text-muted-foreground mt-2">جاري الرفع...</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-[#D4AF8A] text-background hover:bg-[#E8C4A0] disabled:opacity-50"
                >
                  حفظ الذكرية
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Decorative Line */}
        <div className="flex justify-center mb-12">
          <div
            className="w-32 h-px bg-gradient-to-r from-transparent via-[#D4AF8A] to-transparent"
            style={{ boxShadow: '0 0 15px rgba(212, 175, 138, 0.4)' }}
          ></div>
        </div>

        {/* Memories Grid */}
        {isLoading ? (
          <div className="text-center text-muted-foreground">جاري التحميل...</div>
        ) : memories && memories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {memories.map((memory) => (
              <div
                key={memory.id}
                className="bg-[#1A1F3A] border border-[#2A2F4A] rounded-lg p-6 hover:border-[#D4AF8A] transition-all duration-300"
              >
                {memory.imageUrl && (
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-cairo font-bold text-[#D4AF8A] mb-2">{memory.title}</h3>
                <p className="text-sm font-amiri text-muted-foreground mb-2">
                  {format(new Date(memory.date), 'dd MMMM yyyy', { locale: ar })}
                </p>
                {memory.description && (
                  <p className="text-foreground/80 font-amiri mb-4">{memory.description}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#D4AF8A] text-[#D4AF8A] hover:bg-[#D4AF8A] hover:text-background flex-1"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-background flex-1"
                    onClick={() => handleDelete(memory.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg font-amiri">لا توجد ذكريات حتى الآن</p>
            <p className="text-sm font-amiri mt-2">ابدأي بإضافة أول ذكرية جميلة بيننا</p>
          </div>
        )}
      </div>
    </div>
  );
}
