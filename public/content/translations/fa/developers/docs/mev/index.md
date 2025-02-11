---
title: حداکثر ارزش قابل استخراج (MEV)
description: مقدمه‌ای بر حداکثر ارزش قابل استخراج (MEV)
lang: fa
---

حداکثر ارزش قابل استخراج (MEV) به بیشترین ارزش قابل استخراج از تولید بلاک اشاره دارد که علاوه بر پاداش استاندارد بلاک شامل کارمزد تراکنش‌ها است و این کارمزدها با وارد کردن، خارج کردن و تغییر در ترتیب تراکنش‌های موجود در بلاک می‌تواند تغییر کند.

## حداکثر ارزش قابل استخراج {#maximal-extractable-value}

حداکثر ارزش قابل استخراج اولین بار در زمینه [اثبات کار](/developers/docs/consensus-mechanisms/pow/)استفاده شد و اوایل به "ارزش قابل استخراج استخراجگر" اشاره می‌کرد. این به این دلیل است که در اثبات کار استخراجگرها شمول، عدم شمول و ترتیب تراکنش‌ها در بلاک را کنترل می‌کنند. با این حال، پس از تغییر الگوریتم اجماع به اثبات سهام با [ادغام](/roadmap/merge) اعتبارسنج‌ها این وظایف را بر عهده دارند و استخراج دیگر بخشی از پروتکل اتریوم نیست. روش‌های استخراج ارزش همچنان وجود دارند و به همین دلیل عبارت حداکثر ارزش قابل استخراج استفاده می‌شود.

## پیش‌نیازها {#prerequisites}

مطمئن شوید که با مفاهیم زیر آشنا هستید.[تراکنش‌ها](/developers/docs/transactions/)، [بلاک‌ها](/developers/docs/blocks/)، [اثبات سهام](/developers/docs/consensus-mechanisms/pos) و [گاز](/developers/docs/gas/). آشنایی با [اپلیکیشن‌های غیرمتمرکز](/dapps/) و [امور مالی غیرمتمرکز](/defi/) نیز می‌تواند مفید باشد.

## استخراج حداکثر ارزش قابل استخراج {#mev-extraction}

در تئوری MEV به طور کامل به اعتبارسنج‌ها تعلق می‌گیرد زیرا آن‌ها تنها کسانی هستند که می‌توانند اجرای یک فرصت سودآور MEV را تضمین کنند. اما در عمل،بیشترین نسبت MEV استخراج شده مربوط به فعالان مستقل شبکه است که با نام «جستجوگرها» (Searcher) شناخته می‌شوند. جستجوگرها الگوریتم‌های پیچیده را بر روی داده بلاک چین اعمال می‌کنند تا موقعیت‌های سودآور MEV را شناسایی کنند و ربات‌هایی دارند که به صورت خودکار تراکنش‌های سودآور را به شبکه ارسال می‌کند.

به هر حال اعتبارسنج‌ها نیز بخشی از کل MEV را به دست می‌‌آورند زیرا جستجوگرها برای اینکه احتمال شمول تراکنش سودآور خود را در بلاک افزایش دهند کارمزد تراکنش بالاتری پرداخت می‌کنند (که این مبلغ به اعتبارسنج داده می‌شود). اگر فرض کنیم که جستجوگرها از نظر اقتصادی منطقی هستند، کارمزد تراکنشی که یک جستجوگر مایل است پرداخت کند نهایتا به اندازه 100 درصد MEV محاسبه شده است (زیرا اگر کارمزد تراکنش بالاتر باشد، جستجوگر ضرر می‌کند).

به همین دلیل، برای برخی از موقعیت‌های رقابتی MEV مثل [آربیتراژ در صرافی غیرمتمرکز](#mev-examples-dex-arbitrage)، جستجوگرها مجبورند تا 90 درصد و حتی بیشتر درآمد MEV را به صورت کارمزد تراکنش به اعتبارسنج بدهند زیرا تعداد زیادی از افراد می‌خواهند همان معامله سودآور آربیتراژ را اجرا کنند. این به این دلیل است که تنها راه تضمین اینکه تراکنش آربیتراژ آن‌ها اجرایی می‌شود این است که آن‌ها تراکنش را با بالاترین هزینه کارمزد ثبت کرده باشند.

### بهینه‌سازی گاز {#mev-extraction-gas-golfing}

این پدیده باعث به وجود آمدن یک مزیت رقابتی به نام خوب بودن در "مسابقه گاز" شده است - که به معنای برنامه نویسی تراکنش‌ها به گونه‌ای که کمترین مقدار گاز را مصرف کنند، می‌باشد - و چون این به جستجوگران اجازه می‌دهد قیمت گاز بالاتری را تعیین و پرداخت نمایند و در عین حال هزینه‌های کل مقدار گاز خود را ثابت نگه دارند (از آنجایی که هزینه گاز = قیمت گاز \* گاز مصرف شده می‌باشد).

چند تکنیک معروف بهینه‌سازی گاز عبارتند از: استفاده از آدرس‌هایی که با یک رشته طولانی صفر شروع می‌شوند (به عنوان مثال [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)) زیرا فضای (و در نتیجه گاز) کمتری برای ذخیره می‌گیرند. و باقی ماندن توکن های کوچک [ERC-20](/developers/docs/standards/tokens/erc-20/) در قراردادها، از آنجا که برای مقداردهی اولیه یک اسلات ذخیره سازی گاز بیشتری نسبت به به روز رسانی اسلات ذخیره سازی دارد. یافتن تکنیک‌های بیشتر برای کاهش مصرف گاز، یک حوزه تحقیقاتی فعال در میان جستجوگران است.

### پیشتازان عمومی {#mev-extraction-generalized-frontrunners}

به جای برنامه‌ریزی الگوریتم‌های پیچیده برای شناسایی فرصت‌های سودآور MEV، برخی از جستجوگران از پیشتازان عمومی استفاده می‌کنند. پیشتازان عمومی، ربات هایی هستند که برای شناسایی تراکنش های سودآور، استخر حافظه را تماشا می کنند. پیشتاز کد تراکنش بالقوه سودآور را کپی می‌کند، آدرس‌ها را با آدرس پیشتاز جایگزین می‌کند و تراکنش را به صورت محلی اجرا می‌کند تا دوباره بررسی کند که تراکنش اصلاح‌شده منجر به سود در آدرس پیشتاز شود. اگر تراکنش واقعاً سودآور باشد، پیشتاز تراکنش اصلاح شده را با آدرس جایگزین شده و گاز بالاتر ارسال می‌کند و تراکنش اصلی را «پیش‌آزمایی» می‌کند و MEV جستجوگر اصلی را دریافت می‌کند.

### Flashbotها {#mev-extraction-flashbots}

Flashbots یک پروژه مستقل است که کلاینت های اجرا را با سرویسی گسترش می‌دهد که به جستجوگران اجازه می‌دهد تا تراکنش‌های MEV را بدون افشای آن‌ها برای اعتبارسنج ها ارسال کنند. این کار مانع از پیشروی تراکنش ها توسط پیشتازان عمومی می شود.

## نمونه های MEV {#mev-examples}

MEV به چند روش در بلاک چین ظاهر می شود.

### آربیتراژ DEX {#mev-examples-dex-arbitrage}

آربیتراژ [صرافی غیرمتمرکز](/glossary/#dex) (DEX) ساده ترین و شناخته شده ترین فرصت MEV است. در نتیجه رقابتی ترین هم هست.

این کار به این صورت است: اگر دو DEX یک توکن را با دو قیمت متفاوت ارائه دهند، یک نفر می تواند توکن را در DEX با قیمت پایین تر بخرد و آن را در DEX با قیمت بالاتر در یک تراکنش اتمی بفروشد. به لطف مکانیزم بلاک چین، این آربیتراژ واقعی و بدون ریسک است.

[در اینجا مثالی است](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) از تراکنش آربیتراژ سودآور که در آن جستجوگر با استفاده از قیمت‌های متفاوت جفت ETH/DAI در Uniswap در مقابل Sushiswap، 1000 ETH را به 1045 ETH تبدیل کرد.

### نقد شدن ها {#mev-examples-liquidations}

انحلال پروتکل وام دهی فرصت شناخته شده دیگری برای MEV است.

پروتکل‌های وام دهی مانند Maker و Aave از کاربران می‌خواهند که وثیقه‌ای (مانند ETH) را واریز کنند. سپس این وثیقه سپرده شده برای وام دادن به سایر کاربران استفاده می شود.

سپس کاربران می‌توانند بسته به نیازشان دارایی‌ها و نشانه‌ها را از دیگران قرض بگیرند (مثلاً اگر می‌خواهید در یک پیشنهاد حاکمیتی MakerDAO رای دهید، ممکن است MKR قرض بگیرید) تا درصد معینی از وثیقه سپرده‌شده‌شان. به عنوان مثال، اگر مبلغ وام حداکثر 30٪ باشد، کاربری که 100 DAI را به پروتکل واریز می کند، می تواند تا 30 DAI دارایی دیگر را وام بگیرد. پروتکل درصد قدرت وام گیری دقیق را تعیین می کند.

همچنان که ارزش وثیقه وام گیرنده نوسان پیدا می کند، قدرت استقراض آنها نیز تغییر می کند. اگر به دلیل نوسانات بازار، ارزش دارایی های قرض گرفته شده بیش از 30٪ ارزش وثیقه آنها باشد (باز هم، درصد دقیق آن توسط پروتکل تعیین می شود)، پروتکل معمولاً به هر کسی اجازه می دهد وثیقه را نقد کند و بلافاصله بدهی وام دهندگان را پرداخت کند (این شبیه نحوه عملکرد [مارجین کال](https://www.investopedia.com/terms/m/margincall.asp) در امور مالی سنتی است). در صورت انحلال، وام گیرنده معمولاً باید هزینه انحلال سنگینی را بپردازد، که بخشی از آن به مدیر تصفیه می رود - جایی که فرصت MEV به وجود می آید.

جستجوگران برای تجزیه و تحلیل داده های بلاک چین در سریع ترین زمان ممکن رقابت می کنند تا تعیین کنند کدام وام گیرندگان می توانند منحل شوند و اولین کسانی باشند که تراکنش انحلال را ارسال می کنند و هزینه انحلال را برای خود دریافت می کنند.

### معامله ساندویچی {#mev-examples-sandwich-trading}

معامله ساندویچی یکی دیگر از روش های رایج استخراج MEV است.

برای ساندویچ کردن، یک جستجوگر استخر حافظه را برای معاملات بزرگ DEX تماشا می کند. به عنوان مثال، فرض کنید شخصی می خواهد 10000 UNI با DAI در Uniswap بخرد. معامله ای به این بزرگی تأثیر مهمی بر جفت UNI/DAI خواهد داشت و به طور بالقوه قیمت UNI را نسبت به DAI افزایش می دهد.

یک جستجوگر می تواند اثر قیمت تقریبی این معامله بزرگ را روی جفت UNI/DAI محاسبه کند و بلافاصله _قبل از_ معامله بزرگ، سفارش خرید بهینه را اجرا کند، UNI را ارزان بخرد، سپس دستور فروش را فوراً _ پس از_ تجارت بزرگ اجرا کند و آن را به قیمت بالاتر ناشی از سفارش بزرگ بفروشد.

با این حال، ساندویچ کردن خطرناک تر است زیرا اتمی نیست (برخلاف آربیتراژ DEX، همانطور که در بالا توضیح داده شد) و مستعد [حمله salmonella](https://github.com/Defi-Cartel/salmonella) است.

### MEV در NFT {#mev-examples-nfts}

MEV در فضای NFT یک پدیده نوظهور است و لزوماً سودآور نیست.

با این حال، از آنجایی که تراکنش‌های NFT روی همان بلاک چین مشترک سایر تراکنش‌های اتریوم انجام می‌شوند، جستجوگران می‌توانند از تکنیک‌های مشابهی که در فرصت‌های سنتی MEV در بازار NFT استفاده می‌شود، استفاده کنند.

به عنوان مثال، اگر یک افت NFT محبوب وجود داشته باشد و یک جستجوگر یک NFT خاص یا مجموعه ای از NFT ها را بخواهد، می تواند یک تراکنش را طوری برنامه ریزی کند که اولین نفر در صف خرید NFT باشد، یا می تواند کل مجموعه NFT ها را در یک تراکنش خریداری کند. یا اگر یک NFT [به اشتباه با قیمت پایین فهرست شده باشد](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent)، جستجوگر می تواند از سایر خریداران پیشی گرفته و آن را با قیمت ارزان خریداری کند.

یکی از نمونه‌های برجسته MEV در NFT زمانی رخ داد که یک جستجوگر 7 میلیون دلار برای [خرید](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) هر Cryptopunk در کف قیمت هزینه کرد. یک محقق بلاک چین [در توییتر توضیح داد](https://twitter.com/IvanBogatyy/status/1422232184493121538) چگونه خریدار با یک ارائه دهنده MEV کار می کرد تا خرید خود را مخفی نگه دارد.

### قصه طولانی {#mev-examples-long-tail}

آربیتراژ DEX، انحلال، و معامله ساندویچی همگی فرصت های MEV بسیار شناخته شده ای هستند و بعید است که برای جستجوگران جدید سودآور باشند. با این حال، قصه درازی از فرصت های کمتر شناخته شده MEV وجود دارد (MEV در NFT مسلماً یکی از این فرصت ها است).

جستجوگرانی که به تازگی شروع به کار کرده اند ممکن است بتوانند با جستجوی MEV در این دقصه طولانی موفقیت بیشتری پیدا کنند. بورد کار MEV متعلق به Flashbot برخی از فرصت‌های نوظهور را فهرست می‌کند.

## اثرات MEV {#effects-of-mev}

MEV کلا بد نیست - پیامدهای مثبت و منفی برای MEV روی اتریوم وجود دارد.

### خوب {#effects-of-mev-the-good}

بسیاری از پروژه‌های DeFi برای اطمینان از سودمندی و پایداری پروتکل‌های خود به عوامل منطقی اقتصادی متکی هستند. به عنوان مثال، آربیتراژ DEX تضمین می‌کند که کاربران بهترین و صحیح‌ترین قیمت‌ها را برای توکن‌های خود دریافت می‌کنند و پروتکل‌های وام‌دهی به انحلال سریع متکی هستند، زمانی که وام‌گیرندگان کمتر از نسبت وثیقه‌گذاری می‌شوند تا اطمینان حاصل شود که وام‌دهندگان بازپرداخت می‌کنند.

بدون جستجوگران منطقی که به دنبال و رفع ناکارآمدی‌های اقتصادی باشند و از انگیزه‌های اقتصادی پروتکل‌ها بهره ببرند، پروتکل‌های DeFi و به طور کلی ممکن است مانند امروز قوی نباشند.

### بد {#effects-of-mev-the-bad}

در لایه برنامه، برخی از اشکال MEV، مانند معامله ساندویچی، منجر به یک تجربه بدتر برای کاربران می شود. کاربرانی که ساندویچ می شوند با افزایش افت قیمت و اجرای بدتر در معاملات خود مواجه می شوند.

در لایه شبکه، پیشتازان تعمیم یافته و حراج های قیمت گس که اغلب در آن شرکت می کنند (زمانی که دو یا چند نفر پیشتاز برای گنجاندن تراکنش در بلوک بعدی با افزایش تدریجی قیمت گس تراکنش های خود رقابت می کنند) منجر به تراکم شبکه و قیمت بالای گس برای هر کس دیگری می‌شود که سعی در انجام معاملات منظم دارد.

فراتر از آنچه در _در_ بلوک‌ها اتفاق می‌افتد، MEV می‌تواند اثرات مضر _ما بین_ بلوک‌ها داشته باشد. اگر MEV موجود در یک بلوک به‌طور قابل‌توجهی از پاداش بلوک استاندارد فراتر رود، اعتبارسنج ها ممکن است تشویق شوند تا بلوک‌ها را مجددا سازماندهی کنند و MEV را برای خود بگیرند، که باعث سازمان‌دهی مجدد بلاک چین و بی‌ثباتی اجماع می شود.

این امکان سازماندهی مجدد بلاکچین [قبلاً در بلاک چین بیتکوین بررسی شده است](https://dl.acm.org/doi/10.1145/2976749.2978408). از آنجایی که پاداش بلاک بیت‌کوین به نصف می‌رسد و کارمزد تراکنش‌ها بخش بزرگ‌تر و بیشتری از پاداش بلوک را تشکیل می‌دهند، شرایطی پیش می‌آید که از نظر اقتصادی منطقی می‌شود که استخراج‌کنندگان از پاداش بلوک بعدی صرف‌نظر کنند و در عوض بلوک‌های گذشته را با کارمزد بالاتر یادآوری کنند. با رشد MEV، وضعیت مشابهی ممکن است در اتریوم رخ دهد و یکپارچگی بلاک چین را تهدید کند.

## حالت MEV {#state-of-mev}

استخراج MEV در اوایل سال 2021 افزایش یافت و منجر به قیمت بسیار بالای گس در چند ماه اول سال شد. ظهور رله MEV متعلق به Flashbots اثربخشی پیشتازان عمومی را کاهش داده و حراج قیمت گس را از زنجیره خارج کرده و قیمت گس را برای کاربران عادی کاهش داده است.

در حالی که بسیاری از جستجوگران هنوز از MEV درآمد خوبی کسب می کنند، با شناخته شدن فرصت ها و رقابت جستجوگران بیشتر و بیشتر برای فرصت های مشابه، اعتبار سنج ها درآمد کل MEV بیشتری را به دست خواهند آورد (زیرا همان نوع حراج گس که در ابتدا در بالا توضیح داده شد. در Flashbots نیز اتفاق می افتد، البته به صورت خصوصی، و اعتبار سنج ها درآمد حاصل از گس را دریافت می کنند). MEV نیز منحصر به اتریوم نیست و با رقابتی شدن فرصت ها در اتریوم، جستجوگران به سمت بلاک چین های جایگزین مانند زنجیره هوشمند بایننس حرکت می کنند، جایی که فرصت های MEV مشابه با اتریوم با رقابت کمتری وجود دارد.

از سوی دیگر، انتقال از اثبات کار به اثبات سهام و تلاش مداوم برای مقیاس‌بندی اتریوم با استفاده از جمع‌آوری‌ها، همگی چشم‌انداز MEV را به روش‌هایی تغییر می‌دهند که هنوز تا حدودی نامشخص است. هنوز به خوبی شناخته نشده است که چگونه داشتن پیشنهاد دهندگان بلوک تضمین شده که از قبل کمی شناخته شده اند، دینامیک استخراج MEV را در مقایسه با مدل احتمالی در اثبات کار تغییر می دهد یا چگونه این امر هنگام [انتخاب رهبر مخفی منفرد مختل می شود](https://ethresear.ch/t/secret-non-single-leader-election/11789) و [فناوری اعتبارسنج توزیع شده](/staking/dvt/) پیاده سازی می شود. به طور مشابه، باید دید چه فرصت‌های MEV زمانی وجود دارد که بیشتر فعالیت‌های کاربر از اتریوم خارج می‌شوند و روی رول‌‌آپ های لایه 2 و شاردهای آن منتقل می‌شوند.

## MEV در اثبات سهام اتریوم (PoS) {#mev-in-ethereum-proof-of-stake}

همانطور که توضیح داده شد، MEV پیامدهای منفی برای تجربه کلی کاربر و امنیت لایه اجماع دارد. اما انتقال اتریوم به اجماع اثبات سهام (معروف به "ادغام") به طور بالقوه خطرات جدید مرتبط با MEV را معرفی می کند:

### تمرکزگرایی اعتبارسنج {#validator-centralization}

در اتریوم پس از ادغام، اعتبارسنج ها (با سپرده گذاری امنیتی 32 اتریوم) در مورد اعتبار بلوک های اضافه شده به زنجیره بیکن اتفاق نظر دارند. از آنجایی که 32 ETH ممکن است از دسترس بسیاری خارج باشد، [پیوستن به یک استخر سهام](/staking/pools/) ممکن است گزینه عملی تری باشد. با این وجود، توزیع سالم [سهامگذاران انفرادی](/staking/solo/) ایده آل است، زیرا تمرکز اعتبارسنج ها را کاهش می دهد و امنیت اتریوم را بهبود می بخشد.

با این حال، اعتقاد بر این است که استخراج MEV قادر به تسریع تمرکز اعتبارسنج است. این تا حدی به این دلیل است که اعتبارسنج ها [درآمد کمتری برای پیشنهاد بلوک‌ها](/roadmap/merge/issuance/#how-the-merge-impacts-ETH-supply) نسبت به ماینرهای قبلی دارند، استخراج MEV از زمان ادغام تا حد زیادی [درآمد اعتبارسنج ها را تحت تأثیر قرار می‌دهد](https://github.com/flashbots/eth2-research/blob/main/notebooks/mev-in-eth2/eth2-mev-calc.ipynb).

استخرهای بزرگتر سهامگذاری احتمالاً منابع بیشتری برای سرمایه گذاری در بهینه سازی های لازم برای جذب فرصت های MEV خواهند داشت. هرچه این استخرها MEV بیشتری استخراج کنند، منابع بیشتری برای بهبود قابلیت‌های استخراج MEV (و افزایش درآمد کلی) دارند، که اساساً [اقتصاد مقیاس](https://www.investopedia.com/terms/e/economiesofscale.asp#) ایجاد می‌کند.

با منابع کمتری که در اختیار دارند، سهامداران انفرادی ممکن است نتوانند از فرصت های MEV سود ببرند. این ممکن است فشار را بر اعتبارسنج های مستقل برای پیوستن به استخرهای قدرتمند برای افزایش درآمدشان افزایش دهد و تمرکززدایی در اتریوم را کاهش دهد.

### استخرهای حافظه دارای مجوز {#permissioned-mempools}

در پاسخ به حملات ساندویچ و پیشتاز، معامله گران ممکن است شروع به انجام معاملات خارج از زنجیره با اعتبارسنج ها برای حفظ حریم خصوصی تراکنش کنند. معامله‌گر به جای ارسال یک تراکنش بالقوه MEV به استخر حافظه عمومی، آن را مستقیماً برای اعتبارسنج ارسال می‌کند که آن را در یک بلوک قرار می‌دهد و سود را با معامله‌گر تقسیم می‌کند.

«استخرهای تاریک» نسخه بزرگ‌تری از این ترتیب است و به‌عنوان استخرهای حافظه مجاز و فقط قابل دسترسی برای کاربرانی که مایل به پرداخت هزینه‌های خاصی هستند، عمل می‌کنند. این روند بی مجوز بودن و عدم اعتماد اتریوم را کاهش می دهد و به طور بالقوه بلاک چین را به مکانیزم «پرداخت برای بازی» تبدیل می کند که به نفع بالاترین پیشنهاد دهنده است.

استخرهای حافظه دارای مجوز همچنین خطرات متمرکزسازی که در بخش قبل توضیح داده شد را تسریع می کنند. استخرهای بزرگی که دارای اعتبارسنج های متعدد هستند، احتمالاً از ارائه حریم خصوصی تراکنش به معامله گران و کاربران سود می برند و درآمد MEV آنها را افزایش می دهند.

مبارزه با این مشکلات مرتبط با MEV در اتریوم پس از ادغام، یک حوزه اصلی تحقیق است. تا به امروز، دو راه حل پیشنهادی برای کاهش تأثیر منفی MEV بر تمرکززدایی و امنیت اتریوم پس از ادغام، **جداسازی پیشنهاد دهنده-سازنده (PBS)** و **API Builder** هستند.

### تفکیک پیشنهاد دهنده و سازنده {#proposer-builder-separation}

هم در اثبات کار و هم در اثبات سهام، گرهی که یک بلوک می سازد، آن را برای اضافه کردن به زنجیره به گره های دیگر شرکت کننده در اجماع پیشنهاد می کند. یک بلوک جدید پس از ساختن یک استخراجگر دیگر در بالای آن (در PoW) یا دریافت تاییدیه از اکثر اعتبارسنج ها (در PoS) بخشی از زنجیره متعارف می شود.

ترکیبی از نقش های سازنده بلوک و پیشنهاد دهنده بلوک چیزی است که بیشتر مشکلات مربوط به MEV را که قبلاً توضیح داده شد معرفی می کند. برای مثال، گره‌های اجماع انگیزه ایجاد سازمان‌دهی مجدد زنجیره‌ای در حملات طولانی برای به حداکثر رساندن درآمد MEV دارند.

[تفکیک پیشنهاد دهنده-سازنده](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) (PBS) برای کاهش تأثیر MEV، به ویژه در لایه اجماع، طراحی شده است. ویژگی اصلی PBS جداسازی قوانین سازنده بلوک و پیشنهاد دهنده بلوک است. اعتبارسنج ها همچنان مسئول پیشنهاد و رای‌گیری در مورد بلوک‌ها هستند، اما دسته جدیدی از نهادهای تخصصی به نام **بلوک سازان**، وظیفه سفارش تراکنش‌ها و ساخت بلوک‌ها را بر عهده دارند.

تحت PBS، یک سازنده بلوک یک بسته تراکنش ایجاد می کند و پیشنهادی را برای گنجاندن آن در یک بلوک بیکن چین (به عنوان "بار اجرایی") قرار می دهد. اعتبارسنج انتخاب شده برای پیشنهاد بلوک بعدی، پیشنهادات مختلف را بررسی می‌کند و بسته‌ای را با بالاترین هزینه انتخاب می‌کند. PBS اساساً یک بازار حراج ایجاد می کند، جایی که سازندگان با اعتبارسنج هایی که فضای بلوک را می فروشند، مذاکره می کنند.

طرح‌های فعلی PBS از یک [طرح آشکارسازی تعهد](https://gitcoin.co/blog/commit-reveal-scheme-on-ethereum/) استفاده می‌کنند که در آن سازندگان فقط یک تعهد رمزنگاری به محتویات یک بلوک (سر بلوک) را همراه با پیشنهادات خود منتشر می‌کنند. پس از پذیرش پیشنهاد برنده، پیشنهاد دهنده یک پیشنهاد بلوک امضا شده ایجاد می کند که شامل سر بلوک است. انتظار می‌رود سازنده بلوک پس از مشاهده طرح بلوک امضاشده، متن کامل بلوک را منتشر کند، و همچنین باید قبل از نهایی شدن، [تأییدکننده‌های](/glossary/#attestation) کافی از اعتبارسنج ها دریافت کند.

#### چگونه جداسازی پیشنهاد دهنده و سازنده تأثیر MEV را کاهش می دهد؟ {#how-does-pbs-curb-mev-impact}

جداسازی پیشنهاد دهنده-سازنده درون پروتکل، با حذف استخراج MEV از حوزه اعتبارسنج ها، اثر MEV بر اجماع را کاهش می‌دهد. در عوض، سازندگان بلوک که سخت‌افزار تخصصی را اجرا می‌کنند، فرصت‌های MEV را در آینده به دست خواهند آورد.

این امر اعتبارسنج ها را به‌طور کامل از درآمد مرتبط با MEV مستثنی نمی‌کند، زیرا سازندگان باید برای پذیرش بلوک‌هایشان توسط اعتبارسنج ها، قیمت بالایی داشته باشند. با این وجود، با توجه به اینکه اعتبارسنج ها دیگر مستقیماً بر روی بهینه‌سازی درآمد MEV تمرکز نمی‌کنند، تهدید حملات طولانی کاهش می‌یابد.

جداسازی پیشنهاد دهنده-سازنده همچنین خطرات متمرکزسازی MEV را کاهش می دهد. به عنوان مثال، استفاده از یک طرح تعهد-افشا، نیاز سازندگان را به اعتماد به اعتبارسنج ها برای ربودن فرصت MEV یا افشای آن در معرض سایر سازندگان از بین می‌برد. این امر مانع سود سهامداران انفرادی از MEV را کاهش می دهد، در غیر این صورت، سازندگان به طرفداری از استخرهای بزرگ با شهرت خارج از زنجیره و انجام معاملات خارج از زنجیره با آنها گرایش پیدا می کنند.

به طور مشابه، اعتبارسنج ها مجبور نیستند به سازندگان بلوک اعتماد کنند که بدنه های بلوک را پس نمی‌کشند یا بلوک های نامعتبر را منتشر نمی کنند زیرا پرداخت بدون قید و شرط است. حتی اگر بلوک پیشنهادی در دسترس نباشد یا توسط اعتبارسنجی دیگر نامعتبر اعلام شود، هزینه اعتبارسنج همچنان پردازش می‌کند. در مورد دوم، بلوک به سادگی دور ریخته می شود و سازنده بلوک را مجبور می کند که تمام هزینه های تراکنش و درآمد MEV را از دست بدهد.

### API سازنده‌ی بلوک {#builder-api}

در حالی که جداسازی پیشنهاد دهنده و سازنده وعده کاهش اثرات استخراج MEV را می دهد، اجرای آن نیازمند تغییراتی در پروتکل اجماع است. به طور خاص، قانون [انتخاب فورک](/developers/docs/consensus-mechanisms/pos/#fork-choice) در بیکن چین باید به روز شود. [API سازنده بلوک](https://github.com/ethereum/builder-specs) یک راه حل موقت است که با هدف ارائه پیاده سازی کاری جداسازی پیشنهاد دهنده-سازنده، البته با مفروضات اعتماد بالاتر است.

API سازنده بلوک نسخه اصلاح شده [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) است که توسط کلاینت های لایه اجماع برای درخواست بارهای اجرایی از کلاینت های لایه اجرا استفاده می شود. همانطور که در [مشخصات اعتبارسنج صادق](https://github.com/ethereum/consensus-specs/blob/dev/specs/bellatrix/validator.md) مشخص شده است، اعتبارسنجی هایی که برای وظایف پیشنهادی بلوک انتخاب می‌شوند، یک بسته تراکنش را از یک کلاینت اجرا که متصل است درخواست می‌کنند که آن را در بلوک پیشنهادی بیکن چین قرار می‌دهند.

API سازنده بلوک همچنین به عنوان یک میان افزار بین اعتبارسنج و کلاینت های لایه اجرا عمل می کند. اما متفاوت است زیرا به اعتبارسنج های موجود در بیکن چین اجازه می‌دهد تا بلوک‌ها را از موجودیت‌های خارجی تهیه کنند (به‌جای ساختن یک بلوک به صورت محلی با استفاده از یک کلاینت اجرا).

در زیر یک نمای کلی از نحوه عملکرد API سازنده بلوک آورده شده است:

1. Builder API اعتبارسنج را به شبکه ای از سازنده های بلوک که کلاینت های لایه اجرا را اجرا می کنند متصل می کند. مانند PBS، سازندگان بلوک نیز طرف های تخصصی هستند که در بلوک‌سازی با منابع فشرده سرمایه‌گذاری می‌کنند و از استراتژی‌های مختلف برای به حداکثر رساندن درآمد حاصل از MEV به علاوه‌‌ ترفند های اولویت بندی استفاده می‌کنند.

2. یک اعتبارسنج (که یک کلاینت لایه اجماع را اجرا می کند) بارهای اجرایی را به همراه پیشنهادات از شبکه سازندگان درخواست می کند. پیشنهادهای سازنده شامل سرفصل بار اجرایی - تعهد رمزنگاری به محتویات بار - و هزینه ای است که باید به اعتبارسنج پرداخت شود.

3. اعتبارسنج پیشنهادهای دریافتی را بررسی می‌کند و بار اجرایی را با بالاترین هزینه انتخاب می‌کند. با استفاده از API سازنده، اعتبارسنج یک پیشنهاد بلوک "کور" در بیکن ایجاد می کند که فقط شامل امضای آنها و سر پرداخت اجرا می شود و آن را برای سازنده ارسال می کند.

4. سازنده‌ای که API سازنده را اجرا می‌کند، انتظار می‌رود که با مشاهده پیشنهاد بلوک کور، با بار اجرایی کامل پاسخ دهد. این به اعتبارسنج اجازه می دهد تا یک بلوک بیکن "امضا" شده ایجاد کند که در سراسر شبکه منتشر می شود.

5. هنوز انتظار می‌رود که اعتبارسنج با استفاده از API سازنده، در صورتی که سازنده بلوک به سرعت پاسخ ندهد، یک بلوک را به صورت محلی بسازد، بنابراین پاداش‌های پیشنهاد بلوک را از دست نمی‌دهند. با این حال، اعتبارسنج نمی‌تواند بلوک دیگری را با استفاده از تراکنش‌های آشکار شده یا مجموعه‌ای دیگر ایجاد کند، زیرا به معنای _مبهم سازی_ (امضا کردن دو بلوک در یک اسلات) است، که یک جرم قابل جریمه شدن است.

یک نمونه از پیاده‌سازی API سازنده همین [MEV Boost](https://github.com/flashbots/mev-boost) است، یک بهینه سازی در [مکانیسم حراج فلش‌بات‌ها](https://docs.flashbots.net/Flashbots-auction/overview/) که برای مهار اثرات جانبی منفی MEV در اتریوم طراحی شده است. حراج Flashbots به اعتبارسنج ها در اثبات سهام اجازه می دهد تا کار ساخت بلوک های سودآور را به طرف های تخصصی به نام **جستجوگرها** برون سپاری کنند.

جستجوگران به دنبال فرصت‌های سودآور MEV می‌گردند و بسته‌های تراکنش را برای مسدود کردن پیشنهادکنندگان همراه با [مناقصه با قیمت مهر و موم شده](https://en.wikipedia.org/wiki/First-price_sealed-bid_auction) برای درج در بلوک ارسال می‌کنند. اعتباردهنده‌ای که mev-geth را اجرا می‌کند، یک نسخه فورک شده از کلاینت go-ethereum (Geth) فقط باید بسته‌ای را انتخاب کند که بیشترین سود را دارد و آن را به عنوان بخشی از بلوک جدید قرار دهد. برای محافظت از پیشنهاد دهندگان بلوک (اعتبارسنج ها) در برابر هرزنامه و تراکنش‌های نامعتبر، بسته‌های تراکنش قبل از رسیدن به پیشنهاددهنده از **relayer‌ها** برای اعتبارسنجی عبور می‌کنند.

MEV Boost همان حراج Flashbots اصلی را حفظ می کند، البته با ویژگی های جدیدی که برای تغییر اتریوم به اثبات سهام طراحی شده است. جستجوگران هنوز تراکنش‌های سودآور MEV را برای گنجاندن در بلوک‌ها پیدا می‌کنند، اما دسته جدیدی از طرف‌های تخصصی به نام **سازندگان بلوک** مسئول جمع‌آوری تراکنش‌ها و بسته‌ها در بلوک‌ها هستند. سازنده پیشنهادات قیمت مهر و موم شده را از جستجوگران می پذیرد و بهینه سازی هایی را برای یافتن سودآورترین سفارش اجرا می کند.

رله همچنان مسئول اعتبارسنجی بسته های تراکنش قبل از ارسال آنها به پیشنهاد دهنده است. با این حال، MEV Boost در این حین **scrows** را معرفی می‌کند که مسئول ارائه [در دسترس بودن داده‌ها](/developers/docs/data-availability/) با ذخیره بدنه‌های بلوک ارسال شده توسط سازنده‌ها و سرهای بلوک ارسال شده توسط اعتبارسنج ها هستند. در اینجا، یک اعتبارسنج متصل به یک رله، بارهای اجرایی موجود را می‌پرسد و از الگوریتم سفارش MEV Boost برای انتخاب سر بار پرداخت با بالاترین پیشنهاد + نکات MEV استفاده می‌کند.

#### چگونه API سازنده تأثیر MEV را کاهش می دهد؟ {#how-does-builder-api-curb-mev-impact}

مزیت اصلی API سازنده پتانسیل آن برای دموکراتیک کردن دسترسی به فرصت های MEV است. استفاده از طرح‌های commit-reveal مفروضات اعتماد را حذف می‌کند و موانع ورود را برای اعتبارسنج ها که به دنبال بهره‌مندی از MEV هستند کاهش می‌دهد. این باید فشار روی سهامگذاران انفرادی را برای ادغام با استخرهای بزرگ به منظور افزایش سود MEV کاهش دهد.

اجرای گسترده API سازنده رقابت بیشتر بین سازندگان بلوک را تشویق می کند که مقاومت در برابر سانسور را افزایش می دهد. از آنجایی که اعتبارسنج ها پیشنهادهای سازنده‌های متعدد را بررسی می‌کنند، سازنده‌ای که قصد سانسور یک یا چند تراکنش کاربر را دارد باید از همه سازندگان غیرسانسورکننده دیگر پیشی بگیرد تا موفق شود. این به طور چشمگیری هزینه سانسور کاربران را افزایش می دهد و این عمل را دلسرد می کند.

برخی از پروژه‌ها، مانند MEV Boost، از API سازنده به عنوان بخشی از ساختار کلی استفاده می‌کنند که برای ارائه حریم خصوصی تراکنش‌ها به برخی از طرف‌ها طراحی شده است، مانند معامله‌گرانی که سعی می‌کنند از حملات پیشتازی/ ساندویچ اجتناب کنند. این با ارائه یک کانال ارتباطی خصوصی بین کاربران و سازندگان بلوک به دست می آید. برخلاف استخرهای حافظه دارای مجوز که قبلا توضیح داده شد، این رویکرد به دلایل زیر سودمند است:

1. وجود سازنده های متعدد در بازار سانسور را غیرعملی می کند که به نفع کاربران است. در مقابل، وجود استخرهای تاریک متمرکز و مبتنی بر اعتماد، قدرت را در دستان معدود سازندگان بلوک متمرکز می‌کند و امکان سانسور را افزایش می‌دهد.

2. نرم افزار API سازنده منبع باز است که به هر کسی اجازه می دهد خدمات سازنده بلوک را ارائه دهد. این بدان معناست که کاربران مجبور به استفاده از بلوک‌ساز خاصی نیستند و بی‌طرفی و عدم مجوزمحوری اتریوم را بهبود می‌بخشد. علاوه بر این، معامله‌گرانی که به دنبال MEV هستند، سهواً با استفاده از کانال‌های تراکنش خصوصی، به متمرکزسازی کمک نمی‌کنند.

## منابع مرتبط {#related-resources}

- [اسناد Flashbotها](https://docs.flashbots.net/)
- [گیت‌هاب Flashbotها](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) - _داشبورد و کاوشگر تراکنش زنده برای تراکنش‌های MEV_
- [mevboost.org](https://www.mevboost.org/) - _ردیاب با آمار بی‌درنگ برای رله‌های MEV-Boost و سازندگان بلوک_

## بیشتر بخوانید {#further-reading}

- [ارزش قابل استخراج استخراجگر (MEV) چیست؟](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV و Me](https://www.paradigm.xyz/2021/02/mev-and-me)
- [اتریوم یک جنگل تاریک است](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [فرار از جنگل تاریک](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbotها: فرار رو به جلو در بحران MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
- [MEV-Boost: معماری Flashbots آماده ادغام](https://ethresear.ch/t/mev-boost-merge-ready-flashbots-architecture/11177)
- [MEV Boost چیست؟](https://www.alchemy.com/overviews/mev-boost)
- [چرا mev-boost را اجرا کنید؟](https://writings.flashbots.net/writings/why-run-mevboost/)
- [راهنمای سفر به اتریوم](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
