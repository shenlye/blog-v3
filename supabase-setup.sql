-- 创建 moments 表
CREATE TABLE IF NOT EXISTS public.moments (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	content TEXT NOT NULL,
	images TEXT[] DEFAULT '{}',
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 只保留时间索引
CREATE INDEX IF NOT EXISTS moments_created_at_idx ON public.moments(created_at DESC);

-- 启用行级安全策略
ALTER TABLE public.moments ENABLE ROW LEVEL SECURITY;

-- 策略1: 所有人都可以查看动态（保持公开）
CREATE POLICY "Anyone can view moments"
	ON public.moments
	FOR SELECT
	USING (true);

-- 策略2: 只有你自己可以创建动态
CREATE POLICY "Only owner can create moments"
	ON public.moments
	FOR INSERT
	TO authenticated
	WITH CHECK (auth.uid() = 'YOUR_USER_ID');

-- 策略3: 只有你自己可以更新动态
CREATE POLICY "Only owner can update moments"
	ON public.moments
	FOR UPDATE
	TO authenticated
	USING (auth.uid() = 'YOUR_USER_ID')
	WITH CHECK (auth.uid() = 'YOUR_USER_ID');

-- 策略4: 只有你自己可以删除动态
CREATE POLICY "Only owner can delete moments"
	ON public.moments
	FOR DELETE
	TO authenticated
	USING (auth.uid() = 'YOUR_USER_ID');

-- 自动更新 updated_at 的函数
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 触发器
CREATE TRIGGER set_updated_at
	BEFORE UPDATE ON public.moments
	FOR EACH ROW
	EXECUTE FUNCTION public.handle_updated_at();