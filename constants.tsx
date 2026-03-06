
import React from 'react';
import { HelpContent, FactItem, HelpType } from './types';

export const HELP_DATA: HelpContent[] = [
  {
    id: 'human',
    letter: 'H',
    title: 'Human Security',
    subtitle: 'Keselamatan Manusia',
    description: 'Dalam krisis, siapa yang lebih berpeluang selamat? Pahami ketimpangan hak dasar untuk bertahan hidup.',
    modalDescription: (onNavigate: (id: HelpType) => void) => (
      <div className="space-y-4 text-left">
        <p>
          Jawaban pertama untuk pertanyaan kenapa harus keadilan iklim? Adalah, karena kebutuhan paling dasar dari manusia adalah selamat dan tetap hidup. Itu merupakan naluri dasar kita semua, <i>to survive</i>. Dan dalam kondisi yang timpang, rasio keselamatan manusia juga menjadi timpang dalam situasi krisis iklim. Nelayan, petani, masyarakat adat, difabel, dan kelompok rentan lainnya (termasuk kita rakyat biasa para budak korporat, mahasiswa, pekerja informal) berpotensi menghadapi dampak lebih besar dan parah.
        </p>
        <p>
          Simpelnya gini, dalam kondisi <i>extreme heat</i> akibat krisis iklim, pedagang nelayan kecil punya risiko lebih besar terpapar dan terdampak. Ketimbang kelas atas yang bisa kapan saja berlindung di ruangan ber AC. Disinilah ketimpangan terlihat. Padahal, seharusnya semua manusia tanpa pandang kelas, punya kemampuan yang setara untuk selamat dari dampak <i>extreme heat</i> tadi.
        </p>
        <p className="font-black text-red-600 uppercase">
          Ketimpangan inilah yang perlu dijawab dengan KEADILAN IKLIM.
        </p>
        <p>
          Ini adalah seruan untuk kita mulai melihat secara jelas, ada ketimpangan struktural yang terjadi. Dan kita harus melakukan sesuatu. Karena keadilan tidak hadir dengan sendirinya, keadilan harus diperjuangkan.
        </p>
        <p>
          Tapi, kenapa sih ketimpangan ini terjadi <i>at the first place</i>?
        </p>
        <p>
          Untuk memahami itu, kita harus masuk ke poin <button onClick={() => onNavigate('ecological')} className="text-red-500 font-black underline decoration-2 underline-offset-4 hover:text-red-700 transition-colors">hutang ekologis</button>.
        </p>
      </div>
    ),
    color: 'text-orange-600',
    bgColor: 'bg-orange-400',
    borderColor: 'border-orange-500'
  },
  {
    id: 'ecological',
    letter: 'E',
    title: 'Ecological Debt',
    subtitle: 'Hutang Ekologis',
    description: (
      <>
        Mereka yang berhutang, kita semua yang harus berhadapan dengan <i>debt collector</i>.
      </>
    ),
    modalDescription: (onNavigate: (id: HelpType) => void) => (
      <div className="space-y-4 text-left">
        <p>
          Kita sudah memahami urusan ketimpangan dan dampak bagi keselamatan manusia. Tapi kenapa ketimpangan itu bisa terjadi? Untuk menjawab itu, kita harus sedikit mundur kebelakang. Tepatnya saat revolusi industri lalu diikuti dengan revolusi hijau dicanangkan oleh dunia barat. Nenek moyang kita menggunakan perahu kayuh, lalu dunia barat mengenalkan mesin uap. Perahu kayuh tidak memiliki gas buang, sedangkan mesin uap sangat besar emisi gas buangnya. Dulu kita bertani tanpa pestisida kimia, lalu dunia barat mengenalkan kita dengan pestisida kimia. Produksi pertanian melonjak tajam, tapi harus mengorbankan kemurnian unsur tanah.
        </p>
        <p>
          Awalnya kita hidup lestari selaras dengan alam, akhirnya dikenalkan dengan sebuah metode yang membuat kita harus "berhutang" pada alam. Awalnya hanya dikenalkan oleh dunia barat, sekarang kita pun ikut menimbulkan hutang ekologis baru. Ekstraksi batu bara, ekspansi sawit, and pengembangan industri ekstraktif lainnya dilakukan oleh pelaku usaha lokal. Jadi, ini bukan lagi soal ketimpangan negara maju vs berkembang. Karena negara berkembang sendiri sudah menambah hutang ekologis yang harus dibayar oleh semua orang Indonesia. Dan kelompok rentan adalah pihak yang membayar paling mahal. Apakah ini adil? Mereka yang berhutang, tapi kita yang terus ditagih <i>debt collector</i> dalam bentuk cuaca ekstrim dan bencana.
        </p>
        <p className="font-black text-red-600 uppercase">
          Disinilah kita lagi-lagi perlu memperjuangkan KEADILAN IKLIM.
        </p>
        <p>
          Mungkin, sekarang kita mulai bisa sadar bahwa kondisi memang timpan. Lalu, saya harus bagaimana?
        </p>
        <p>
          Mari perlahan kita masuk ke aspek <button onClick={() => onNavigate('land')} className="text-red-500 font-black underline decoration-2 underline-offset-4 hover:text-red-700 transition-colors">Hak Atas Tanah</button> supaya lebih jelas.
        </p>
      </div>
    ),
    color: 'text-red-600',
    bgColor: 'bg-red-500',
    borderColor: 'border-red-600'
  },
  {
    id: 'land',
    letter: 'L',
    title: 'Land Rights',
    subtitle: 'Hak Atas Tanah',
    description: 'Hak dasar untuk ruang produksi dalam masa krisis. Ini pertahanan pertama sekaligus terakhir.',
    modalDescription: (onNavigate: (id: HelpType) => void) => (
      <div className="space-y-4 text-left">
        <p>
          Cara yang paling konkrit adalah jaga ruang produksi kita. Jangan jual tanahmu kepada para pengembang, karena tanah adalah ruang hidup kita paling dasr dalam kondisi krisis. Ketika bahan pangan melambung harganya, tanah yang kita miliki bisa menjadi penopang lewat berkebun dan beternak. Kita harus paksa Pemerintah melindungi hak atas tanah yang kita kuasai.
        </p>
        <p>
          Sebagian kita mungkin tidak memiliki tanah sebagai asset, maka itu menjadi alasan yang lebih kuat untuk menyuarakan hak tanah bagi seluruh rakyat Indonesia. Karena pada akhirnya, bumi yang kita pijak ini adalah <b>"Tanah Air Kita"</b>. Atau kita cukup puas slogan tadi sekedar jadi lagu?
        </p>
        <p>
          Urusan hak atas tanah ini mungkin bagi kita, warga urban / perkotaan terlebih pada kelas menengah, terdengar terlalu jauh dari realitas. “Jangnkan tanah cuy, tempat tinggal aja ngekost..”. Dan kita lebih familiar dengan seruan pakai tumbler, kurangi plastik, dan gunakan transportasi umum. Tidak salah. Mari kita tetap lakukan itu semua. Dan untuk memperjuangkan <b>KEADILAN IKLIM</b>, kita harus mampu mulai melihat akar masalahnya. Semua tadi benar, dan perlu kita lengkapi dengan pemahaman soal akar masalah. Yaitu, memperjuangkan ha katas tanah.
        </p>
        <p>
          Sampai pada titik ini, anda mungkin akan mengira, “..kenapa penjelasannya makin rumit dan tidak jelas?”. Bisa jadi, itu karena kita baru setengah jalan dalam perjalanan memahami <b>KEADILAN IKLIM</b>. Penutupnya, kita harus menyadari soal <button onClick={() => onNavigate('production')} className="text-red-500 font-black underline decoration-2 underline-offset-4 hover:text-red-700 transition-colors">pola produksi konsumsi</button> manusia.
        </p>
      </div>
    ),
    color: 'text-green-600',
    bgColor: 'bg-green-500',
    borderColor: 'border-green-600'
  },
  {
    id: 'production',
    letter: 'P',
    title: 'Production & Consumption',
    subtitle: 'Pola Produksi & Konsumsi',
    description: 'Cepat dapat, cepat buang. Pola hidup konsumtif yang memicu krisis iklim global.',
    modalDescription: () => (
      <div className="space-y-4 text-left">
        <p>
          Untuk lebih jelasnya, kenapa kita perlu memperjuangkan hak atas tanah. Mari kita coba pelajari polanya. Salah satu masalah terbesar kita adalah soal pola produksi dan konsumsi manusia modern yang memicu pelepasan gas rumah kaca. Hal ini bisa terjadi akibat revolusi industri dan revolusi hijau yang tadi dikenalkan kepada kita oleh dunia barat. Manusia dijadikan memiliki pola konsumsi yang serba cepat. Dulu, kita membeli baju untuk dipakai bertahun-tahun, sekarang? Setiap bulan ada tren baru, baju lama langsung terasa 'kuno'. Makanan serba instan, bungkusnya plastik sekali pakai, sekali santap langsung buang.
        </p>
        <p>
          Pola pikir <b>"cepat dapat, cepat buang"</b> inilah yang menjadi mesin pendorong utama krisis iklim. Karena di balik setiap baju fast fashion yang murah, ada pabrik yang membuang limbah dan mengeluarkan emisi gas rumah kaca. Di balik setiap ponsel baru, ada mineral berharga yang ditambang habis-habisan, merusak lingkungan dan menghancurkan ruang hidup masyarakat rentan. Sistem ini konsumtif ini sengaja dirancang untuk memaksa kita boros sehingga membawa keuntungan bagi korporasi besar. Mereka untung besar, sementara masyarakat rentang diminta untuk menanggung hutan ekologisnya.
        </p>
        <p>
          Sehingga memperjuangkan <b>KEADILAN IKLIM</b> adalah tentang menuntut perubahan mendasar pada sistem produksi dan konsumsi yang tidak adil ini. Sehingga, menggunakan tumbler, mengurangi plastik, dan menggunakan transportasi umum tetap krusial dilakukan. Dan menguatkan Hak Atas Tanah menjadi kunci kedaulatan kita atas ruang produksi. Ketika kita berhasil melindungi ruang produksi, kita memiliki pilihan yang lebih berdaulat untuk bertani, berkebun, and hidup lestari, alih-alih menjadi sekadar konsumen yang terus-menerus menggerakkan mesin korporasi yang merusak.
        </p>
      </div>
    ),
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
    borderColor: 'border-blue-600'
  }
];

export const FACTS: FactItem[] = [
  {
    value: '3-6x',
    label: 'Kerentanan Lebih Tinggi',
    description: 'Masyarakat Adat & rumah tangga miskin terhadap dampak iklim langsung.'
  },
  {
    value: '79%',
    label: 'Emisi Historis',
    description: 'Kontribusi negara maju & korporasi besar yang belum dipertanggungjawabkan.'
  },
  {
    value: '48%',
    label: 'Emisi Top 10%',
    description: 'Populasi terkaya bertanggung jawab atas hampir separuh emisi global.'
  }
];
