import React from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Stack, Link } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const news = [
  {
    id: "0",
    date: "01.01.2019",
    title: "Суд по интеллектуальным правам",
    text: "Суды не приняли во внимание, что недействительность договора может быть связана не только с нарушением самих правил проведения торгов, но и с иными нарушениями требований закона. Заключение договора об отчуждении недвижимого имущества, принадлежащего обществу, допускалось исключительно посредством торгов.Согласно пункту 8 статьи 448 ГК РФ условия соответствующего договора могли быть изменены сторонами после проведения торгов по основаниям, установленным законом, или по иным основаниям, если изменение договора не повлияло на те его условия, которые имели существенное значение для определения цены на торгах. Однако условие относительного того, что продается имущество, обремененное арестом в пользу ФНС России, имело существенное значение для правильного определения цены договора. У судов не имелось достаточных оснований полагать, что в случае изначального предложения договора на измененном условии (о продаже имущества, не находящегося под арестом) состав участников торгов, равно как и предложения по цене, остались бы прежними и победителем торгов все равно был бы признан центр. При отчуждении арестованного имущества круг потенциальных покупателей всегда сужается, цена продажи – снижается.Действия сторон по изменению условия договора, сформулированного в документации о торгах и значительным образом влиявшего на их результат, могли указывать на то, что в отношении объекта, предлагавшегося к продаже на торгах (арестованный бизнес-центр) договор купли-продажи не был заключен, а в отношении существенно отличавшегося объекта (бизнес-центр, не обремененный правами третьего лица) торги не проводились и был заключен обычный прямой договор.Такие действия могут быть квалифицированы как обход норм о продаже имущества несостоятельного должника на торгах, а договор, условия которого изменены по сравнению с условиями документации о торгах, – как ничтожная сделка, нарушающая требования закона и при этом посягающая на права и охраняемые законом интересы третьих лиц – кредиторов несостоятельного продавца (пункт 3 статьи 139 Закон о банкротстве, пункт 2 статьи 168 и пункт 8 статьи 448 ГК РФ). К требованиям о признании ничтожной сделки недействительной и о применении последствий ее недействительности применим трехлетний срок исковой давности (пункт 1 статьи 181 ГК РФ).Следовательно, для правильного разрешения обособленного спора существенное значение имели доводы налогового органа относительно того, что центр не имел намерения заключить договор на условиях, раскрытых в публикациях о торгах, фактически была заключена сделка на иных условиях, настольно отличающихся от первоначальных, что она не может считаться совершенной по результатам торгов.",
    imageUrl:
      "https://fort.u1780911.isp.regruhosting.ru/upload/iblock/8f2/c9f8dj5uhdudmj4fk2up2ir6t7uttnxt.webp",
  },
  {
    id: "1",
    date: "02.03.2020",
    title: "О прекращении производства по делу",
    text: "Заключение договора об отчуждении недвижимого имущества, принадлежащего обществу, допускалось исключительно посредством торгов.Согласно пункту 8 статьи 448 ГК РФ условия соответствующего договора могли быть изменены сторонами после проведения торгов по основаниям, установленным законом, или по иным основаниям, если изменение договора не повлияло на те его условия, которые имели существенное значение для определения цены на торгах. Однако условие относительного того, что продается имущество, обремененное арестом в пользу ФНС России, имело существенное значение для правильного определения цены договора. У судов не имелось достаточных оснований полагать, что в случае изначального предложения договора на измененном условии (о продаже имущества, не находящегося под арестом) состав участников торгов, равно как и предложения по цене, остались бы прежними и победителем торгов все равно был бы признан центр. При отчуждении арестованного имущества круг потенциальных покупателей всегда сужается, цена продажи – снижается.Действия сторон по изменению условия договора, сформулированного в документации о торгах и значительным образом влиявшего на их результат, могли указывать на то, что в отношении объекта, предлагавшегося к продаже на торгах (арестованный бизнес-центр) договор купли-продажи не был заключен, а в отношении существенно отличавшегося объекта (бизнес-центр, не обремененный правами третьего лица) торги не проводились и был заключен обычный прямой договор.Такие действия могут быть квалифицированы как обход норм о продаже имущества несостоятельного должника на торгах, а договор, условия которого изменены по сравнению с условиями документации о торгах, – как ничтожная сделка, нарушающая требования закона и при этом посягающая на права и охраняемые законом интересы третьих лиц – кредиторов несостоятельного продавца (пункт 3 статьи 139 Закон о банкротстве, пункт 2 статьи 168 и пункт 8 статьи 448 ГК РФ). К требованиям о признании ничтожной сделки недействительной и о применении последствий ее недействительности применим трехлетний срок исковой давности (пункт 1 статьи 181 ГК РФ).Следовательно, для правильного разрешения обособленного спора существенное значение имели доводы налогового органа относительно того, что центр не имел намерения заключить договор на условиях, раскрытых в публикациях о торгах, фактически была заключена сделка на иных условиях, настольно отличающихся от первоначальных, что она не может считаться совершенной по результатам торгов.",
    imageUrl:
      "https://fort.u1780911.isp.regruhosting.ru/upload/iblock/8f2/c9f8dj5uhdudmj4fk2up2ir6t7uttnxt.webp",
  },
];

const Article = () => {
  let { id } = useParams();

  const article = news.find((f) => f.id === id);

  return (
    <Container
      maxWidth="false"
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: [2], md: [4] },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: { xs: 2, md: 4 }, maxWidth: "864px" }}
        >
          {article.title}
        </Typography>
        <Typography sx={{ maxWidth: "864px" }}>{article.text}</Typography>
        <Box
          component="img"
          src={article.imageUrl}
          alt="photo"
          loading="lazy"
          sx={{
            width: "100%",
            maxWidth: "864px",
            my: 2,
          }}
        />
      </Paper>
    </Container>
  );
};

export default Article;