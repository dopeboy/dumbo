from apiapp.models import *

def make(exam, section, num, answers, url):
    for i in range(1, num):
        order = section * 100 + i
        pic = url % i
        if i <= answers:
            answer = url % ("%danswer" % i)
        else:
            answer = ""

        tags = "[]"
        hierarchy = "[]"
        display_text = "Section %d - Question %d" % (section, i)

        p = Problem(exam=exam, order=order, problem_img_url=pic, choices_img_url=answer, tags=tags, hierarchy=hierarchy, display_text=display_text)
        p.save()

for i in range(137, 175):
    problem = Problem.objects.get(id=i)
    for j in range(1, 6):
        answer = '<img class="ui image" src="https://s3-us-west-1.amazonaws.com/dumbo-dev/test4_section4/%d_%d_a.png">' % (problem.order % 100, j)
        step = Step(problem=problem, order=j, question="", answer=answer)
        step.save()
