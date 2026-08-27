-- App roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

-- User roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Helper function to check roles (security definer to avoid recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    );
$$;

-- Bikes catalog
CREATE TABLE public.bikes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    name text NOT NULL,
    tagline text,
    category text NOT NULL DEFAULT 'commuter',
    engine_cc integer,
    mileage_kmpl numeric(5,2),
    power_bhp numeric(5,2),
    torque_nm numeric(5,2),
    fuel_tank_l numeric(4,2),
    seat_height_mm integer,
    weight_kg integer,
    ex_showroom_price numeric(10,2) NOT NULL,
    rto_price numeric(10,2) DEFAULT 0,
    insurance_price numeric(10,2) DEFAULT 0,
    accessories_price numeric(10,2) DEFAULT 0,
    colors jsonb DEFAULT '[]'::jsonb,
    features jsonb DEFAULT '[]'::jsonb,
    specs jsonb DEFAULT '{}'::jsonb,
    image_url text,
    gallery jsonb DEFAULT '[]'::jsonb,
    is_featured boolean DEFAULT false,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT ON public.bikes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bikes TO authenticated;
GRANT ALL ON public.bikes TO service_role;

ALTER TABLE public.bikes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bikes are publicly readable"
    ON public.bikes
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Staff can manage bikes"
    ON public.bikes
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Enquiries from contact forms, test rides, service bookings, etc.
CREATE TABLE public.enquiries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source text NOT NULL DEFAULT 'contact',
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    bike_slug text REFERENCES public.bikes(slug) ON DELETE SET NULL,
    interest text,
    message text,
    preferred_date date,
    preferred_time text,
    status text NOT NULL DEFAULT 'new',
    notes text,
    ip_address text,
    recaptcha_score numeric(4,3),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage enquiries"
    ON public.enquiries
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Customers
CREATE TABLE public.customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    phone text NOT NULL,
    email text,
    bike_purchased_slug text REFERENCES public.bikes(slug) ON DELETE SET NULL,
    purchase_date date,
    last_service_date date,
    next_service_due date,
    insurance_expiry date,
    notes text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage customers"
    ON public.customers
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Service records
CREATE TABLE public.service_records (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    service_date date NOT NULL,
    service_type text NOT NULL DEFAULT 'general',
    description text,
    cost numeric(10,2),
    next_service_due date,
    created_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_records TO authenticated;
GRANT ALL ON public.service_records TO service_role;

ALTER TABLE public.service_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage service records"
    ON public.service_records
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Reminders
CREATE TABLE public.reminders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id uuid REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    reminder_type text NOT NULL DEFAULT 'service',
    due_date date NOT NULL,
    sent_at timestamptz,
    status text NOT NULL DEFAULT 'pending',
    email_subject text,
    email_body text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE (customer_id, reminder_type, due_date)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.reminders TO authenticated;
GRANT ALL ON public.reminders TO service_role;

ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage reminders"
    ON public.reminders
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Email log
CREATE TABLE public.email_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient text NOT NULL,
    subject text NOT NULL,
    body text,
    status text NOT NULL DEFAULT 'sent',
    error_message text,
    reminder_id uuid REFERENCES public.reminders(id) ON DELETE SET NULL,
    sent_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.email_log TO authenticated;
GRANT ALL ON public.email_log TO service_role;

ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view email log"
    ON public.email_log
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Activity log
CREATE TABLE public.activity_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    action text NOT NULL,
    entity_type text,
    entity_id uuid,
    details jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.activity_log TO authenticated;
GRANT ALL ON public.activity_log TO service_role;

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view activity log"
    ON public.activity_log
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Chat conversations
CREATE TABLE public.chat_conversations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id text NOT NULL,
    messages jsonb DEFAULT '[]'::jsonb NOT NULL,
    ip_address text,
    recaptcha_score numeric(4,3),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_conversations TO authenticated;
GRANT ALL ON public.chat_conversations TO service_role;

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view chat conversations"
    ON public.chat_conversations
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Failed submissions / abuse log
CREATE TABLE public.failed_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source text NOT NULL,
    ip_address text,
    reason text NOT NULL,
    payload jsonb,
    created_at timestamptz DEFAULT now() NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.failed_submissions TO authenticated;
GRANT ALL ON public.failed_submissions TO service_role;

ALTER TABLE public.failed_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view failed submissions"
    ON public.failed_submissions
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
    WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER bikes_updated_at BEFORE UPDATE ON public.bikes
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER enquiries_updated_at BEFORE UPDATE ON public.enquiries
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER customers_updated_at BEFORE UPDATE ON public.customers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER reminders_updated_at BEFORE UPDATE ON public.reminders
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER chat_conversations_updated_at BEFORE UPDATE ON public.chat_conversations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed sample bikes
INSERT INTO public.bikes (slug, name, tagline, category, engine_cc, mileage_kmpl, power_bhp, torque_nm, fuel_tank_l, seat_height_mm, weight_kg, ex_showroom_price, rto_price, insurance_price, accessories_price, colors, features, specs, image_url, gallery, is_featured, is_active, sort_order) VALUES
('splendor-plus', 'Hero Splendor Plus', 'India''s most trusted commuter', 'commuter', 97.2, 80.6, 7.9, 8.05, 9.8, 785, 112, 75000, 8500, 4500, 2500, '[{"name":"Black with Purple","hex":"#1a1a2e"},{"name":"Black with Red","hex":"#2d0a0a"},{"name":"Glaze Black","hex":"#0f0f0f"}]'::jsonb, '["i3S technology","Analog-digital instrument cluster","Tubeless tyres","Durable chain"]'::jsonb, '{"transmission":"4-speed","brakes":"Drum","suspension":"Telescopic fork"}'::jsonb, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', '[]'::jsonb, true, true, 1),
('passion-pro', 'Hero Passion Pro', 'Style meets mileage', 'commuter', 113.2, 70.0, 9.0, 9.89, 10.0, 790, 117, 82000, 9200, 4800, 3000, '[{"name":"Sports Red","hex":"#8b0000"},{"name":"Techno Blue","hex":"#003366"},{"name":"Black"}]'::jsonb, '["Auto sail","Side-stand indicator","Digital instrument cluster","LED tail lamp"]'::jsonb, '{"transmission":"5-speed","brakes":"Drum","suspension":"Telescopic fork"}'::jsonb, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80', '[]'::jsonb, true, true, 2),
('glamour', 'Hero Glamour', 'Premium commuter with style', 'commuter', 124.7, 69.0, 10.84, 10.6, 10.0, 790, 122, 95000, 10500, 5200, 3500, '[{"name":"Candy Blazing Red","hex":"#b30000"},{"name":"Techno Blue","hex":"#003366"},{"name":"Black with Tornado Grey"}]'::jsonb, '["XSens technology","Fully digital cluster","Auto bank sensor","Engine immobilizer"]'::jsonb, '{"transmission":"5-speed","brakes":"Disc/Drum","suspension":"Telescopic fork"}'::jsonb, 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80', '[]'::jsonb, true, true, 3),
('xtreme-160r', 'Hero Xtreme 160R', 'Street fighter attitude', 'sports', 163, 50.0, 15.0, 14.0, 12.0, 790, 138, 125000, 14500, 6500, 5000, '[{"name":"Sports Red","hex":"#8b0000"},{"name":"Fearless Black","hex":"#0a0a0a"},{"name":"Pearl White"}]'::jsonb, '["Single-channel ABS","LED projector headlamp","Digital instrument cluster","Split seat"]'::jsonb, '{"transmission":"5-speed","brakes":"Disc","suspension":"USD forks"}'::jsonb, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80', '[]'::jsonb, true, true, 4),
('xpulse-200', 'Hero Xpulse 200', 'Adventure ready', 'adventure', 199.6, 40.0, 18.0, 17.1, 13.0, 825, 158, 145000, 16500, 7200, 8000, '[{"name":"Folio Green","hex":"#2d4a1e"},{"name":"Sports Red","hex":"#8b0000"},{"name":"Lightning Black"}]'::jsonb, '["Long-travel suspension","Spoke wheels","Switchable ABS","Tall windscreen"]'::jsonb, '{"transmission":"5-speed","brakes":"Disc","suspension":"Long travel forks"}'::jsonb, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80', '[]'::jsonb, true, true, 5);
