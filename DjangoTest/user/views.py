import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views import View


# Create your views here.

class ViewTest_get(View):
    def get(self,request):
        username = request.GET.get("username")
        if username==None:
            return JsonResponse({"code":200,"info":"who are you?"})
        return JsonResponse({"code":200,"info":"hello {0} !this is get".format(username)})


class ViewTest_post_1(View):
    def post(self,request):
        job=request.GET.get("job")
        if job==None:
            return JsonResponse({"code":200,"info":"一位无业游民"})
        return JsonResponse({"code":200,"info":"一位{0}".format(job)})

class ViewTest_post_2(View):
    def post(self,request):
        data = json.loads(request.body.decode("utf-8"))
        print(data)
        job=data["job"]
        if job==None:
            return JsonResponse({"code":200,"info":"一位无业游民"})
        return JsonResponse({"code":200,"info":"一位{0}".format(job)})


