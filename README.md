# Blockchain teknolojisi ile Seçim Sistemi
<br>
Bu proje konsept bir projedir. Vatandaşların e-devlet üzerinden oy kullanabilmeleri senaryosu üzerine kurulmuş bir örnektir. 
<br>
MEAN stack kullanılarak geliştirilmiştir. Oyların güvenliği ve sistemde değiştirilememesini garantilemek için blockchain teknolojisi kullanılmıştır.

Proje seçim projesi olduğu için kişilerin anonimliği önemlidir. Bunun için ise kişilerden oy kullanırken bir key istenir ve kişinin tc bilgisi ve kendi oyu, key ile şifrelenir.
Bu şifrelenmiş veri ile oy değeri blockchain havuzuna bir transaction olarak atılır. 

NOT : Bu şifrelemeyi hash olarak da yapabilirdik ama herhangi bir aksi durumda vatandaşlar belirledikleri şifrelerle oylarını ispatlayabilirler.

Sistemdeki nodelar belirli sayıda transaction alarak mining işlemine başlarlar ve ilk block'u oluşturan miner, oluşturulan yeni bloğu diğer node'lara iletir.
<br><br>
Sonradan eklenecekler: <br>
-Veri değişikliği olmuş nodeun sistemden atılması <br>
-Bir node ağa dahil olduğunda en uygun node'dan blockları alması (şuan ilk oluşturulan node'dan alıyor.)<br>
(Proje konsept bir proje olduğu için geliştirilmesi gereken bir çok yeri mevcut)<br>
<br><br>
<a href ="https://github.com/merveagca" target="_blank"> Frontend detaylı inceleme</a>

<a href ="https://github.com/merveagca" target="_blank"> Backend detaylı inceleme</a>
