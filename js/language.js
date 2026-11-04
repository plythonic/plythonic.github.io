let LANG = 'en';
try { const sv = localStorage.getItem('plython-lang'); if (['tr', 'en'].includes(sv)) LANG = sv; } catch (e) { }
const IDX = { tr: 0, en: 1 };
const LOC = { tr: 'tr-TR', en: 'en-US' };

const T = {
  // Header & Navigation
  "Plython — Güçlü Discord Moderasyon Botu": ["Plython — Güçlü Discord Moderasyon Botu", "Plython — Powerful Discord Moderation Bot"],
  "Menü": ["Menü", "Menu"],
  "Özellikler": ["Özellikler", "Features"],
  "Bot İstatistikleri": ["Bot İstatistikleri", "Bot Statistics"],
  "Kurulum": ["Kurulum", "Setup"],
  "Destek": ["Destek", "Support"],
  "Dashboard": ["Dashboard", "Dashboard"],
  "Discord'a Ekle": ["Discord'a Ekle", "Add to Discord"],
  "Plython": ["Plython", "Plython"],
  
  // Hero Section
  "Plython Bot İstatistikleri": ["Plython Bot İstatistikleri", "Plython Bot Statistics"],
  "185+ Sunucuda Aktif Kullanımda": ["185+ Sunucuda Aktif Kullanımda", "Active On 185+ Servers"],
  "Yüzlərcə Discord sunucusu Plython ile moderasyon ve yönetim işlemlerini otomatikleştiriyor. Küçükten büyüğe her sunucu için idealdir.": ["Yüzlərcə Discord sunucusu Plython ile moderasyon ve yönetim işlemlerini otomatikleştiriyor. Küçükten büyüğe her sunucu için idealdir.", "Hundreds of Discord servers automate moderation and management with Plython. Ideal for servers of all sizes."],
  
  // Stats
  "Aktiv sunucular": ["Aktiv sunucular", "Active Servers"],
  "Toplam kullanıcı": ["Toplam kullanıcı", "Total Users"],
  "Günlük komutlar": ["Günlük komutlar", "Daily Commands"],
  "Uptime": ["Uptime", "Uptime"],
  
  // Charts
  "Canlı": ["Canlı", "Live"],
  "Günlük Komut Kullanımı": ["Günlük Komut Kullanımı", "Daily Command Usage"],
  "Son 30 günde 150.000+ komut çalıştırıldı": ["Son 30 günde 150.000+ komut çalıştırıldı", "150,000+ Commands Executed In Last 30 Days"],
  "Bugün": ["Bugün", "Today"],
  
  "En Popüler Komutlar": ["En Popüler Komutlar", "Most Popular Commands"],
  "Son 30 günde en çok kullanılan komut kategorileri": ["Son 30 günde en çok kullanılan komut kategorileri", "Most Used Command Categories In Last 30 Days"],
  "Moderasyon, ticket ve otomasyon komutları en çok kullanılıyor.": ["Moderasyon, ticket ve otomasyon komutları en çok kullanılıyor.", "Moderation, Ticket And Automation Commands Are Most Used."],
  
  // Command categories
  "Moderasyon": ["Moderasyon", "Moderation"],
  "Otomasyon": ["Otomasyon", "Automation"],
  "Kullanıcı": ["Kullanıcı", "User"],
  "Sunucu": ["Sunucu", "Server"],
  "Emoji": ["Emoji", "Emoji"],
  "Diğer": ["Diğer", "Other"],
  "Ticket": ["Ticket", "Ticket"],
  
  // Features Section
  "Neden Plython": ["Neden Plython", "Why Plython"],
  "Sunucunuzu Yönetmek İçin İhtiyacınız Olan Her Şey": ["Sunucunuzu Yönetmek İçin İhtiyacınız Olan Her Şey", "Everything You Need To Manage Your Server"],
  "Plython, Discord sunucu yöneticileri için özel geliştirilmiş çok amaçlı bir bottur. Moderasyon, otomasyon, ticket ve güvenlik - hepsi bir arada.": ["Plython, Discord sunucu yöneticileri için özel geliştirilmiş çok amaçlı bir bottur. Moderasyon, otomasyon, ticket ve güvenlik - hepsi bir arada.", "Plython is a multi-purpose bot specially developed for Discord server administrators. Moderation, automation, ticket and security - all in one."],
  
  "Gelişmiş Moderasyon Araçları": ["Gelişmiş Moderasyon Araçları", "Advanced Moderation Tools"],
  "40+ moderasyon komutu ile sunucunuzu tam kontrol altında tutun. Ban, kick, mute, timeout, lock, unlock, slowmode ve daha fazlası tek bir botla.": ["40+ moderasyon komutu ile sunucunuzu tam kontrol altında tutun. Ban, kick, mute, timeout, lock, unlock, slowmode ve daha fazlası tek bir botla.", "Keep your server under full control with 40+ moderation commands. Ban, kick, mute, timeout, lock, unlock, slowmode and more in one bot."],
  
  // Theme Settings
  "Tema": ["Tema", "Theme"],
  "Discord": ["Discord", "Discord"],
  "Midnight": ["Midnight", "Midnight"],
  "Açık": ["Açık", "Light"],
  "Sunset": ["Sunset", "Sunset"],
  "Düğme Stili": ["Düğme Stili", "Button Style"],
  "Dolu": ["Dolu", "Solid"],
  "Çerçeve": ["Çerçeve", "Outline"],
  "Köşe Yuvarlaklığı": ["Köşe Yuvarlaklığı", "Corner Radius"],
  
  // Bot Card
  "Plython Bot": ["Plython Bot", "Plython Bot"],
  "Doğrulanmış": ["Doğrulanmış", "Verified"],
  "Plython: Çok Amaçlı Discord Botu": ["Plython: Çok Amaçlı Discord Botu", "Plython: Multi-Purpose Discord Bot"],
  "Güçlü moderasyon, akıllı otomasyon ve profesyonel ticket sistemi. 185+ sunucunun tercihi.": ["Güçlü moderasyon, akıllı otomasyon ve profesyonel ticket sistemi. 185+ sunucunun tercihi.", "Powerful moderation, smart automation and professional ticket system. Choice of 185+ servers."],
  "Discord'a ekle": ["Discord'a ekle", "Add to Discord"],
  
  // Feature Cards
  "Nitrosuz Emoji Kullanımı": ["Nitrosuz Emoji Kullanımı", "Emoji Usage Without Nitro"],
  "Discord Nitro olmadan başka serverlerden emoji kullan. +emoji_adı+ veya /emoji komutu ile herhangi bir serverdeki emojiye anında erişim. Binlerce custom emoji kullanabilir, kendi emoji kütüphanenizi oluşturabilir ve sunucunuz daha eğlenceli hale getirebilirsiniz. Animasyonlu emojiler de desteklenir.": ["Discord Nitro olmadan başka serverlerden emoji kullan. +emoji_adı+ veya /emoji komutu ile herhangi bir serverdeki emojiye anında erişim. Binlerce custom emoji kullanabilir, kendi emoji kütüphanenizi oluşturabilir ve sunucunuz daha eğlenceli hale getirebilirsiniz. Animasyonlu emojiler de desteklenir.", "Use emojis from other servers without Discord Nitro. Instant access to emojis from any server with +emoji_name+ or /emoji command. You can use thousands of custom emojis, create your own emoji library and make your server more fun. Animated emojis are also supported."],
  
  "Özel Sunucu URL'si": ["Özel Sunucu URL'si", "Custom Server URL"],
  "/setup komutu ile plython.gg/sunucuadınız gibi özel kısa link oluşturun. Sunucunuzu kolay hatırlanır URL ile tanıtın ve paylaşın.": ["/setup komutu ile plython.gg/sunucuadınız gibi özel kısa link oluşturun. Sunucunuzu kolay hatırlanır URL ile tanıtın ve paylaşın.", "Create a custom short link like plython.gg/yourserver with /setup command. Promote and share your server with an easy-to-remember URL."],
  
  "Güvenlik Ve Koruma": ["Güvenlik Ve Koruma", "Security And Protection"],
  "Anti-raid, anti-spam, anti-scam koruması ile sunucunuzu 7/24 koruyun. Zararlı kullanıcılar otomatik tespit edilir ve engellenir.": ["Anti-raid, anti-spam, anti-scam koruması ile sunucunuzu 7/24 koruyun. Zararlı kullanıcılar otomatik tespit edilir ve engellenir.", "Protect your server 24/7 with anti-raid, anti-spam, anti-scam protection. Malicious users are automatically detected and blocked."],
  
  "Ticket & Destek Sistemi": ["Ticket & Destek Sistemi", "Ticket & Support System"],
  "Profesyonel ticket paneli ile kullanıcılarınıza özel destek kanalları oluşturun. Otomatik kategori, log sistemi ve transcript özelliği dahil.": ["Profesyonel ticket paneli ile kullanıcılarınıza özel destek kanalları oluşturun. Otomatik kategori, log sistemi ve transcript özelliği dahil.", "Create dedicated support channels for your users with professional ticket panel. Includes automatic category, log system and transcript feature."],
  
  // Setup Section
  "Nasıl Başlarım": ["Nasıl Başlarım", "How Do I Start"],
  "Plython'u Sunucuna Eklemek Çok Kolay": ["Plython'u Sunucuna Eklemek Çok Kolay", "Adding Plython To Your Server Is Very Easy"],
  "Sadece 3 basit adımda Plython'u Discord sunucunuza ekleyip kullanmaya başlayın. Teknik bilgi gerektirmez, herkes kullanabilir.": ["Sadece 3 basit adımda Plython'u Discord sunucunuza ekleyip kullanmaya başlayın. Teknik bilgi gerektirmez, herkes kullanabilir.", "Add Plython to your Discord server and start using it in just 3 simple steps. No technical knowledge required, anyone can use it."],
  
  "Botu Sunucuna Davet Et": ["Botu Sunucuna Davet Et", "Invite Bot To Your Server"],
  "Discord'a Ekle butonuna tıklayın, sunucunuzu seçin ve gerekli izinleri onaylayın. Bot otomatik olarak sunucunuza katılır.": ["Discord'a Ekle butonuna tıklayın, sunucunuzu seçin ve gerekli izinleri onaylayın. Bot otomatik olarak sunucunuza katılır.", "Click Add to Discord button, select your server and approve required permissions. Bot automatically joins your server."],
  
  "Botun Özellikleri Otomatik Aktif": ["Botun Özellikleri Otomatik Aktif", "Bot Features Automatically Active"],
  "Plython sunucuya katıldığında temel moderasyon ve güvenlik özellikleri hemen aktif olur. İstediğiniz ayarları /setup ile özelleştirin.": ["Plython sunucuya katıldığında temel moderasyon ve güvenlik özellikleri hemen aktif olur. İstediğiniz ayarları /setup ile özelleştirin.", "When Plython joins the server, basic moderation and security features are immediately active. Customize the settings you want with /setup."],
  
  "Komutları Kullanmaya Başla": ["Komutları Kullanmaya Başla", "Start Using Commands"],
  "/help veya +help yazarak 40+ komutu keşfedin. Hem slash (/) hem de prefix (+) komutları desteklenir, istediğinizi kullanın.": ["/help veya +help yazarak 40+ komutu keşfedin. Hem slash (/) hem de prefix (+) komutları desteklenir, istediğinizi kullanın.", "Discover 40+ commands by typing /help or +help. Both slash (/) and prefix (+) commands are supported, use whichever you prefer."],
  
  // Comparison Section
  "Discord sunucuları için tasarlandı": ["Discord sunucuları için tasarlandı", "Designed For Discord Servers"],
  "Profesyonel Sunucu Yönetimi Artık Daha Kolay": ["Profesyonel Sunucu Yönetimi Artık Daha Kolay", "Professional Server Management Is Now Easier"],
  "Plython'un sunduğu gelişmiş özellikler sayesinde sunucunuzu profesyonel bir şekilde yönetin. Premium botlara gerek yok.": ["Plython'un sunduğu gelişmiş özellikler sayesinde sunucunuzu profesyonel bir şekilde yönetin. Premium botlara gerek yok.", "Manage your server professionally with advanced features offered by Plython. No need for premium bots."],
  
  "Plython": ["Plython", "Plython"],
  "Basit botlar": ["Basit botlar", "Simple Bots"],
  "Premium botlar": ["Premium botlar", "Premium Bots"],
  "Nitrosuz emoji kullanımı": ["Nitrosuz emoji kullanımı", "Emoji Without Nitro"],
  "Ticket transcript sistemi": ["Ticket transcript sistemi", "Ticket Transcript System"],
  "Ticket sistemi": ["Ticket sistemi", "Ticket System"],
  "7/24 Çalışma süresi": ["7/24 Çalışma süresi", "24/7 Uptime"],
  "Özel sunucu URL": ["Özel sunucu URL", "Custom Server URL"],
  "Security Protection": ["Security Protection", "Security Protection"],
  "Kısmen": ["Kısmen", "Partially"],
  
  // CTA Section
  "Discord Sunucunuzun İhtiyacı Olan Güçlü Bot": ["Discord Sunucunuzun İhtiyacı Olan Güçlü Bot", "The Powerful Bot Your Discord Server Needs"],
  "Plython'u hemen ücretsiz olarak sunucunuza ekleyin. 40+ komut, otomatik moderasyon ve 7/24 destek için şimdi başlayın.": ["Plython'u hemen ücretsiz olarak sunucunuza ekleyin. 40+ komut, otomatik moderasyon ve 7/24 destek için şimdi başlayın.", "Add Plython to your server for free now. Get started with 40+ commands, automatic moderation and 24/7 support."],
  "Kurulum Rehberi": ["Kurulum Rehberi", "Setup Guide"],
  
  // Footer
  "Discord sunucuları için gelişmiş çok amaçlı bot. 40+ komut, moderasyon, otomasyon, ticket sistemi ve 7/24 güvenlik koruması.": ["Discord sunucuları için gelişmiş çok amaçlı bot. 40+ komut, moderasyon, otomasyon, ticket sistemi ve 7/24 güvenlik koruması.", "Advanced multi-purpose bot for Discord servers. 40+ commands, moderation, automation, ticket system and 24/7 security protection."],
  
  "Platform": ["Platform", "Platform"],
  "Komutlar": ["Komutlar", "Commands"],
  "Discord Sunucusu": ["Discord Sunucusu", "Discord Server"],
  "Gizlilik Politikası": ["Gizlilik Politikası", "Privacy Policy"],
  "© 2026 Plython Bot": ["© 2026 Plython", "© 2026 Plython"],
  "discord.gg/plython": ["discord.gg/plython", "discord.gg/plython"]
};

function t(k) {
  const v = T[k];
  return !v ? k : (v[IDX[LANG]] || v[0]);
}
