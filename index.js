const { chromium } = require('playwright');

function getRandomElements(array, count) {
  const shuffledArray = array.slice(); // Tạo một bản sao của mảng ban đầu
  let currentIndex = array.length;
  let randomIndex;

  // Xáo trộn mảng
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  // Lấy phần tử đầu tiên
  return shuffledArray.slice(0, count);
}


(async () => {
  // Khởi tạo trình duyệt Chromium
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Điều hướng đến Google Form
    const listEntry = [
      'entry.1442630179',
      'entry.494966688',
      'entry.1247930911',
      'entry.588132896',
      'entry.938067242',
      'entry.991634753',
      'entry.1423376209', //
      'entry.1473688780', //
      'entry.202863663', //
      'entry.251062530', //
      'entry.1324443124', //
      'entry.1415880600',
      'entry.1208978014', //
      'entry.2107611309', //
      'entry.527661335', //
      'entry.567961629', //
      'entry.1123126373'
    ]

    const options = [
      ['12 - 17 tuổi', '18 - 24 tuổi', '25 - 30 tuổi', 'Trên 30 tuổi'],
      ['Ít khi xem', 'Thỉnh thoảng xem', 'Thường xuyên xem', 'Rất thường xuyên xem'],
      ['Vì tôi tò mò, muốn tìm hiểu thêm về du lịch Việt Nam.', 'Vì tôi đang tìm cảm hứng cho chuyến đi/kế hoạch du lịch của mình.', 'Vì tôi bị hấp dẫn, thu hút bởi nội dung và hình thức thể hiện của video.', 'Vì tôi muốn cập nhật thông tin mới nhất về du lịch.'],
      ['Tăng cường nhận thức về các địa điểm du lịch nổi tiếng của Việt Nam.', 'Thu hút du khách đến Việt Nam để khám phá những địa điểm được quảng bá trên Tik Tok.', 'Xây dựng thương hiệu và nâng cao hình ảnh về du lịch Việt Nam.', 'Đóng góp vào việc phát triển ngành du lịch, tăng doanh thu và năng lực cạnh tranh trong thị trường quốc tế.'],
      ['Cảnh quan thiên nhiên, di tích lịch sử', 'Hoạt động văn hóa: lễ hội, nghệ thuật dân gian,...', 'Ẩm thực, đặc sản địa phương', 'Hoạt động trải nghiệm thú vị', 'Giới thiệu và khám phá các điểm đến nổi tiếng', 'Review và chia sẻ kinh nghiệm đi du lịch'],
      ['Nội dung có tính chính xác, thực tế', 'Nội dung có tính chỉ dẫn, hướng dẫn cụ thể', 'Nội dung có tính đa dạng về chủ đề', 'Nội dung có tính sáng tạo, khuyến khích tương tác', 'Tiêu đề hấp dẫn, gần gũi, gợi sự tò mò'],
      ['Bình thường', 'Hài lòng', 'Rất hài lòng'],
      ['Chất lượng video', 'Chất lượng âm thanh', 'Giá trị nghệ thuật các góc quay', 'Thời lượng video'],
      [1, 2, 3, 4, 5]
    ]

    const inputValue = [
      'Tôi muốn nội dung cần có tính sáng tạo hơn, nhiều kênh có nội dung theo format giống nhau, bị nhàm',
      'Một số tài khoản còn đưa thông tin sai lệch, cần cải thiện điều này',
      'Cần đa dạng chủ đề nội dung hơn nữa, nhiều tài khoản làm mãi về 1 chủ đề',
      'Tôi nghĩ chưa cần cải thiện gì lắm, mấy tài khoản tôi xem khá oke rồi',
      'Thời lượng hơi ngắn, tôi nghĩ nên tăng thời lượng lên 1 chút vì nhiều lúc chưa biết được nhiều thông tin',
      'Nhiều video được quay ngang tỷ lệ nên nhìn nhỏ nhỏ, ko đầy màn hình làm tôi xem ko đc đã lắm'
    ]

    for (let i = 0; i < 30; i++) {
      const page = await context.newPage();

      let string = '';
      //Random
      listEntry.forEach((key, index) => {
        //Chon nhieu
        if([2,3,4,5].includes(index)) {
          const min = 1;
          const max = options[index].length;
          const random = Math.floor(Math.random() * (max - min + 1)) + min;
          const randomElements = getRandomElements(options[index], random);

          randomElements.forEach(value => {
            string += `${key}=${value}&`;
          })
        }
        //Chon hai long, ....
        else if([6,7,8,9,10,12,13,14,15].includes(index)) {
          const min = 0;
          const max = 2;
          const random = Math.floor(Math.random() * (max - min + 1)) + min;
          const value = options[6][random];
          string += `${key}=${value}&`;
        }
        else {
          const min = 0;
          let max;
          if (index === 16) {
            max = 4;
          } else {
            max = 3;
          }
          const random = Math.floor(Math.random() * (max - min + 1)) + min;
          let realIndex;
          if(index < 2) {
            realIndex = index;
          } else if (index === 11) {
            realIndex = 7;
          } else {
            realIndex = 8;
          }
          const value = options[realIndex][random];
          if (index !== 16) {
            string += `${key}=${value}&`;
          } else {
            console.log(value);
            string += `${key}=${value}`;
          }
        }
      })

      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd2mdM_PyoBqqSFyxx12G6uDoAU2DLezJJR6fyvz48r51reqg/viewform?' + string;
      await page.goto(formUrl, {timeout: 30000});

      // Đặt giá trị cho trường input
      const inputSelector = 'input.whsOnd.zHQkBf';
      const random = Math.floor(Math.random() * 6);
      const value = inputValue[random];
      await page.fill(inputSelector, value);
      console.log(value);

      //Submit
      const buttonSelector = 'div[role="button"].QvWxOd';
      await page.click(buttonSelector);
    }
    
    console.log('Đã submit biểu mẫu thành công!');
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error);
  } finally {
    // Đóng trình duyệt
    await context.close();
    await browser.close();
  }
})();
