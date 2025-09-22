# Reading an excel file using Python 
import xlrd

# Give the location of the file 
loc = "paperlist-ecs265.xlsx"

# To open Workbook 
wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)

f = open("paperlist-ecs265-f25.html", "w+")
# For row 0 and column 0 
for i in range(27):
    date = sheet.cell_value(i, 1)
    papers = sheet.cell_value(i, 2)
    if '\n' in papers:
        st1 = papers.splitlines()
        paper1 = st1[0]
        paper2 = st1[1]
        st = '''
        <b style="font-weight: bold">{0}:</b>
        <ul>
            <li>{1} <b style="font-weight: bold">[TBA]</b></li>
            <li>{2} <b style="font-weight: bold">[TBA]</b></li>
    
        </ul>'''.format(date, paper1, paper2)
    else:
        st = '''
        <b style="font-weight: bold">{0}:</b>
        <ul>
            <li>{1} <b style="font-weight: bold">[TBA]</b></li>
        </ul>'''.format(date, papers)
    f.write(st)

