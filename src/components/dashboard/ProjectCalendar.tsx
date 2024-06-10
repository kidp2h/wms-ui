import { Alert, Calendar, DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export type ProjectCalendarPropsType = {
  code: string;
}

export type InfoDate = {
  day: number;
  month: number;
  year: number;

}
export type RangeType = {
  end: InfoDate;
  start: InfoDate;
}
export const ProjectCalendar = ({ code }: ProjectCalendarPropsType) => {

  const [range, setRange] = useState<RangeType>()
  const [date, setDate] = useState<Dayjs>()
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())

  const selectDate = (date: Dayjs) => {
    setDate(date)
    setSelectedDate(date)

    console.log(date);

  }

  const onPanelChange = (date: Dayjs) => {
    setSelectedDate(date)
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    const startOfWeek = date.day(0).get('D') + 1
    const endOfWeek = date.day(0).get('D') + 7
    const month = date.month();
    const year = date.year()
    const startDatetime = dayjs(`${year}-${month}-${startOfWeek}`).toDate()
    const endDatetime = dayjs(`${year}-${month}-${endOfWeek}`).toDate()

    setRange({

      start: {
        day: startOfWeek,
        month,
        year,
      },
      end: {
        day: endOfWeek,
        month,
        year,
      },
    })
  };

  return (
    <div>
      <DatePicker showNow={false} className="mb-5" type="week" picker="week" onChange={onChange} allowClear={false} />

      {
        (range &&
          <Calendar value={date} onSelect={selectDate} onPanelChange={onPanelChange} headerRender={() => null} disabledDate={(currentDate) => {

            if (range) {

              if (currentDate.month() === range?.start.month && currentDate.date() >= range.start.day && currentDate.date() <= range.end.day && currentDate.year() === range.start.year) {
                return false
              }
            }
            return true
          }} />
        )
      }
    </div >
  )
}
