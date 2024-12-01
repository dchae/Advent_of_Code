require 'fileutils'
require 'date'

def filepath(filename, subfolder = '')
  File.join(*[File.expand_path(__dir__), subfolder, filename].compact)
end

def get_cur_yr_day
  parent_dir = Date.today.year.to_s
  [parent_dir, Dir.children(filepath(nil, parent_dir)).max.succ]
end

def cur_day_dirpath(filename = nil)
  parent_dir, cur_day = get_cur_yr_day
  dir = File.join(parent_dir, cur_day)
  filepath(filename, dir)
end

def create_file(filepath, file_content = '')
  dirname = File.dirname(filepath)
  FileUtils.mkdir_p(dirname) unless File.directory?(dirname)

  File.open(filepath, 'w') { |f| f.write(file_content) }
end

template = <<~TEMPLATE
  def filepath(filename, subfolder = '')
    File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
  end

  path = filepath('input.txt')
  path = filepath('exinput.txt')
  lines = File.read(path).split(\"\n\")

  # Part 1


  # Part 2
TEMPLATE
cur_year, cur_day = get_cur_yr_day
subfolder = File.join(get_cur_yr_day)

create_file(filepath(cur_day + '.rb', subfolder), template)
create_file(filepath('exinput.txt', subfolder))
create_file(filepath('input.txt', subfolder))
