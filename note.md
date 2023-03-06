Dear Kak Febrian,

Untuk yg JWT saya sudah dapet token nya, sudah lihat full dari recording session 5, tapi terkendala di authorization, jadi status nya 401, Unauthorized. Tapi user dan password nya sudah sesuai dan bisa jalan. Mungkin saya ada miss di bagian mana yang membuat dia jadi unauthorized. 

Jadi untuk challange ini, saya pake yg di local strategy dulu karena flow di aplikasi nya sudah bisa berjalan kak.

Mohon reviewnya kak,

Terima kasih


// ======== Self Note ========

Flow Authentication : 

1. Entry Point dari "/routes/registerRoute.js" --> nanti di ubah jadi authRoute
2. Masuk ke "lib/passport" -> dia manggil function userLogin yang ada di controller
3. Masuk ke "controllers/authController" (controller yang ngatur semua fungsi2 login dan registernya) CONTROLLER = DAPUR -> YANG MENGHUBUNGKAN KE DATABASE
4. Balik lagi ke "lib/passport"
5. dari passport balikin ke whoami yang di passport

