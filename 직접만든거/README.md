12/21
prototype

12/22
기존에 카피한걸 카피폴더로 옮기고 새로 제작

문제점

로컬스토리지에 객체가 저장되지 않아서 원인을 찾아봤더니
새 todolist를 만들 때 마다 객체가 새로 만들어지긴 하나,
모든 todolist는 하나의 객체 데이터를 공유함
=> 이름 바꿔서 해결

로컬스토리지가 잘 작동하지 않는다 
아직 해결하기 어려울듯