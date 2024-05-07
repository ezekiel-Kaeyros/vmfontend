class CustomMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("hellooooooo")

        response = self.get_response(request)
        print("custom middleware after response or previous middleware")
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        pass

    def process_exception(self, request, exception):
        pass

    def process_template_response(self, request, response):
        pass
